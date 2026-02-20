import { useState } from 'react';
import { useAddVideo } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Loader2, Upload } from 'lucide-react';
import { ExternalBlob } from '../../backend';
import { Progress } from '../ui/progress';

export default function VideoUpload() {
  const [videoId, setVideoId] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const addVideo = useAddVideo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoId.trim() || !videoFile) return;

    try {
      const arrayBuffer = await videoFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      await addVideo.mutateAsync({ id: videoId.trim(), video: blob });
      setVideoId('');
      setVideoFile(null);
      setUploadProgress(0);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Video
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="videoId">Video ID</Label>
            <Input
              id="videoId"
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
              placeholder="Enter video ID"
              disabled={addVideo.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoFile">Video File</Label>
            <Input
              id="videoFile"
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              disabled={addVideo.isPending}
            />
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <Label>Upload Progress</Label>
              <Progress value={uploadProgress} />
              <p className="text-sm text-muted-foreground">{uploadProgress}%</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={!videoId.trim() || !videoFile || addVideo.isPending}
            className="w-full bg-primary hover:bg-primary/90 font-bold"
          >
            {addVideo.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Upload Video
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

