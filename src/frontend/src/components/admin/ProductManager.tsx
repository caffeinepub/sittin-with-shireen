import { useState } from 'react';
import { useGetProducts, useAddProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Loader2, Plus, Trash2, Edit } from 'lucide-react';
import { ExternalBlob, type Product } from '../../backend';
import { Progress } from '../ui/progress';

export default function ProductManager() {
  const { data: products } = useGetProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    priceInCents: '',
    imageFile: null as File | null
  });
  const [uploadProgress, setUploadProgress] = useState(0);

  const resetForm = () => {
    setFormData({ id: '', name: '', description: '', priceInCents: '', imageFile: null });
    setEditingId(null);
    setUploadProgress(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.priceInCents || !formData.imageFile) return;

    try {
      const arrayBuffer = await formData.imageFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      const productData: Product = {
        id: editingId || `product-${Date.now()}`,
        name: formData.name.trim(),
        description: formData.description.trim(),
        priceInCents: BigInt(Math.round(parseFloat(formData.priceInCents) * 100)),
        image: imageBlob
      };

      if (editingId) {
        await updateProduct.mutateAsync(productData);
      } else {
        await addProduct.mutateAsync(productData);
      }

      resetForm();
    } catch (error) {
      console.error('Product save error:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      priceInCents: (Number(product.priceInCents) / 100).toString(),
      imageFile: null
    });
  };

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct.mutateAsync(productId);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {editingId ? 'Edit Product' : 'Add Product'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter product description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.priceInCents}
                onChange={(e) => setFormData({ ...formData, priceInCents: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, imageFile: e.target.files?.[0] || null })}
              />
            </div>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-2">
                <Label>Upload Progress</Label>
                <Progress value={uploadProgress} />
                <p className="text-sm text-muted-foreground">{uploadProgress}%</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={!formData.name.trim() || !formData.priceInCents || !formData.imageFile}
                className="flex-1 bg-secondary hover:bg-secondary/90 font-bold"
              >
                {(addProduct.isPending || updateProduct.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editingId ? 'Update Product' : 'Add Product'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Products</CardTitle>
        </CardHeader>
        <CardContent>
          {!products || products.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No products yet</p>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex gap-4 items-center border rounded-lg p-4">
                  <img
                    src={product.image.getDirectURL()}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold">{product.name}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                    <p className="text-sm font-bold text-secondary">
                      ${(Number(product.priceInCents) / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                      disabled={deleteProduct.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

