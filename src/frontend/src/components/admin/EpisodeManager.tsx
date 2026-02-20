import { useState } from 'react';
import { useGetEpisodes, useAddEpisode, useUpdateEpisode, useDeleteEpisode } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Loader2, Plus, Trash2, Edit } from 'lucide-react';
import type { Episode } from '../../backend';

export default function EpisodeManager() {
  const { data: episodes } = useGetEpisodes();
  const addEpisode = useAddEpisode();
  const updateEpisode = useUpdateEpisode();
  const deleteEpisode = useDeleteEpisode();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: ''
  });

  const resetForm = () => {
    setFormData({ title: '', description: '', url: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.url.trim()) return;

    try {
      const episodeData: Episode = {
        id: editingId || `episode-${Date.now()}`,
        title: formData.title.trim(),
        description: formData.description.trim(),
        url: formData.url.trim()
      };

      if (editingId) {
        await updateEpisode.mutateAsync(episodeData);
      } else {
        await addEpisode.mutateAsync(episodeData);
      }

      resetForm();
    } catch (error) {
      console.error('Episode save error:', error);
    }
  };

  const handleEdit = (episode: Episode) => {
    setEditingId(episode.id);
    setFormData({
      title: episode.title,
      description: episode.description,
      url: episode.url
    });
  };

  const handleDelete = async (episodeId: string) => {
    if (confirm('Are you sure you want to delete this episode?')) {
      await deleteEpisode.mutateAsync(episodeId);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {editingId ? 'Edit Episode' : 'Add Episode'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Episode Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter episode title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter episode description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Audio URL</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://example.com/audio.mp3"
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={!formData.title.trim() || !formData.url.trim()}
                className="flex-1 bg-primary hover:bg-primary/90 font-bold"
              >
                {(addEpisode.isPending || updateEpisode.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editingId ? 'Update Episode' : 'Add Episode'}
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
          <CardTitle>Existing Episodes</CardTitle>
        </CardHeader>
        <CardContent>
          {!episodes || episodes.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No episodes yet</p>
          ) : (
            <div className="space-y-4">
              {episodes.map((episode) => (
                <div key={episode.id} className="flex gap-4 items-start border rounded-lg p-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold">{episode.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{episode.description}</p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{episode.url}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(episode)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(episode.id)}
                      disabled={deleteEpisode.isPending}
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

