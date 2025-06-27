
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, FileText, CheckCircle, AlertCircle, 
  File, FileSpreadsheet, X 
} from 'lucide-react';

export const DataUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: 'CDR_Sample_Data.xlsx',
      size: '2.4 MB',
      type: 'CDR',
      status: 'completed',
      progress: 100,
      columns: 8,
      records: 15420
    },
    {
      id: 2,
      name: 'IPDR_Log_2024.csv',
      size: '5.7 MB',
      type: 'IPDR',
      status: 'processing',
      progress: 65,
      columns: 12,
      records: null
    }
  ]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload logic here
      console.log('Files dropped:', e.dataTransfer.files);
    }
  }, []);

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'cdr':
        return <File className="h-5 w-5 text-blue-400" />;
      case 'ipdr':
        return <FileSpreadsheet className="h-5 w-5 text-green-400" />;
      case 'fir':
        return <FileText className="h-5 w-5 text-purple-400" />;
      default:
        return <File className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'processing':
        return <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Upload Zone */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Data Upload</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-400 bg-blue-400/10' 
                : 'border-slate-600 hover:border-slate-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              Drop files here or click to upload
            </h3>
            <p className="text-slate-400 mb-4">
              Supports Word, PDF, Excel files for CDR, IPDR, and FIR data
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Choose Files
            </Button>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 rounded bg-slate-700/50">
                <FileText className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <p className="text-white font-medium">CDR Files</p>
                <p className="text-slate-400 text-xs">Call Detail Records</p>
              </div>
              <div className="p-3 rounded bg-slate-700/50">
                <FileSpreadsheet className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <p className="text-white font-medium">IPDR Files</p>
                <p className="text-slate-400 text-xs">Internet Protocol Detail Records</p>
              </div>
              <div className="p-3 rounded bg-slate-700/50">
                <File className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <p className="text-white font-medium">FIR Documents</p>
                <p className="text-slate-400 text-xs">First Information Reports</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.type)}
                    <div>
                      <h4 className="text-white font-medium">{file.name}</h4>
                      <p className="text-sm text-slate-400">{file.size} • {file.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(file.status)}
                    <Badge variant={
                      file.status === 'completed' ? 'default' :
                      file.status === 'processing' ? 'secondary' : 'destructive'
                    }>
                      {file.status}
                    </Badge>
                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {file.status === 'processing' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Processing...</span>
                      <span className="text-slate-400">{file.progress}%</span>
                    </div>
                    <Progress value={file.progress} className="h-2" />
                  </div>
                )}
                
                {file.status === 'completed' && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex space-x-4">
                      <span className="text-green-400">✅ {file.columns} columns detected</span>
                      <span className="text-blue-400">📊 {file.records?.toLocaleString()} records processed</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Analyze</Button>
                      <Button size="sm" variant="ghost">Export</Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Validation Rules */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Data Validation Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-white font-medium">CDR Requirements:</h4>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Caller ID, Called ID columns mandatory</li>
                <li>• Date/Time format: YYYY-MM-DD HH:MM:SS</li>
                <li>• Call Duration in seconds</li>
                <li>• Tower ID/Location data preferred</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-white font-medium">IPDR Requirements:</h4>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Source IP, Destination IP mandatory</li>
                <li>• Session start/end timestamps</li>
                <li>• Data volume (bytes) information</li>
                <li>• User identification fields</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
