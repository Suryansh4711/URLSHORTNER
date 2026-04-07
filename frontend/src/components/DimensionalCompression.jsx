import React, { useState } from 'react';
import { CopyButton } from '@/components/ui/copy-button';
import { LinkDurationSelector } from './LinkDurationSelector';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';

const DimensionalCompression = ({ urlInput, setUrlInput, onCompress, urls, error, onDelete }) => {
  const [_LinkDuration, _setLinkDuration] = useState({ duration: 7, unit: 'day' });
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deletingUrlId, setDeletingUrlId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUrlToDelete, setSelectedUrlToDelete] = useState(null);

  const handleDurationChange = (duration) => {
    _setLinkDuration(duration);
    console.log('Link duration selected:', duration);
  };

  const handleDeleteClick = (urlId, shortCode) => {
    setSelectedUrlToDelete({ urlId, shortCode });
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUrlToDelete) return;

    try {
      setDeletingUrlId(selectedUrlToDelete.urlId);
      setShowDeleteDialog(false);
      await onDelete(selectedUrlToDelete.urlId);
      setDeleteSuccess(true);

      // Show success message for 2 seconds
      setTimeout(() => {
        setDeleteSuccess(false);
        setDeletingUrlId(null);
        setSelectedUrlToDelete(null);
      }, 2000);
    } catch (err) {
      console.error('Error deleting URL:', err);
      setDeletingUrlId(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCompress(urlInput);
  };

  return (
    <section className="py-32 relative bg-gray-950/50" id="shorten">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-space-grotesk text-5xl md:text-6xl font-bold mb-4 tracking-tight text-white">
              DIMENSIONAL COMPRESSION
            </h2>
            <p className="text-gray-400 font-manrope text-lg">
              Input your target destination to receive a Nebula-optimized link.
            </p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg backdrop-blur">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative group mb-12">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-cyan-400/30 rounded-2xl blur-md"></div>
            <div className="relative bg-gray-950 p-2 rounded-2xl flex flex-col md:flex-row gap-2 border border-gray-800">
              <div className="flex-1 flex items-center px-6">
                <span className="text-purple-400 mr-3 text-2xl">🔗</span>
                <input 
                  className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-gray-600 py-4 font-manrope text-base outline-none" 
                  placeholder="https://hyper-gate-9.galaxy/very-long-coordinate-path"
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="bg-cyan-400 text-black px-10 py-4 rounded-xl font-black tracking-wider hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2 flex-shrink-0"
              >
                COMPRESS <span>⚡</span>
              </button>
            </div>
          </form>

          {/* Link Duration Selector */}
          <div className="mb-12">
            <LinkDurationSelector onDurationChange={handleDurationChange} defaultDuration={7} />
          </div>

          {/* Stats */}
          <div className="mt-12 flex justify-center gap-12 flex-wrap">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-space-grotesk font-bold text-purple-400">12.8M+</span>
              <span className="text-[10px] font-space-grotesk tracking-widest text-gray-400 uppercase mt-2">Links Synced</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-space-grotesk font-bold text-cyan-400">0.001s</span>
              <span className="text-[10px] font-space-grotesk tracking-widest text-gray-400 uppercase mt-2">Latency</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-space-grotesk font-bold text-pink-400">99.9%</span>
              <span className="text-[10px] font-space-grotesk tracking-widest text-gray-400 uppercase mt-2">Uptime</span>
            </div>
          </div>

          {/* URLs List */}
          {urls.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-white mb-6 font-space-grotesk">Recent Links</h3>
              
              {/* Delete Success Alert */}
              {deleteSuccess && (
                <div className={`mb-6 p-4 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg backdrop-blur transition-all duration-500 ease-out ${deleteSuccess ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  ✓ Link deleted successfully!
                </div>
              )}
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {urls.map((url) => (
                  <div key={url._id} className={`p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-purple-500/50 transition-all ${deletingUrlId === url._id ? 'opacity-50' : 'opacity-100'}`}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <a href={url.orignalUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors break-all text-sm">
                          {url.orignalUrl.substring(0, 60)}...
                        </a>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <code className="bg-black/50 px-3 py-1 rounded text-xs font-mono text-cyan-400">
                          localhost:3000/{url.shortCode}
                        </code>
                        <CopyButton value={`localhost:3000/${url.shortCode}`} copyMessage="Copied!" />
                        <button
                          onClick={() => handleDeleteClick(url._id, url.shortCode)}
                          disabled={deletingUrlId === url._id}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {url.count} clicks
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Link?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete the link <code className="bg-black/50 px-2 py-1 rounded text-cyan-400">localhost:3000/{selectedUrlToDelete?.shortCode}</code>? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex justify-end gap-3">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleConfirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
};

export default DimensionalCompression;
