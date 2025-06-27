
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Activity, Search, Filter, Download, 
  AlertTriangle, CheckCircle, Info, Clock 
} from 'lucide-react';

export const ActivityLog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const activities = [
    {
      id: 1,
      timestamp: '2024-03-20 14:32:15',
      type: 'alert',
      category: 'Anomaly Detection',
      message: 'Suspicious call pattern detected for number +91-9876543210',
      details: '15 calls made to different numbers within 2-minute window',
      officer: 'SI Kumar',
      status: 'reviewing'
    },
    {
      id: 2,
      timestamp: '2024-03-20 14:28:45',
      type: 'success',
      category: 'Data Processing',
      message: 'CDR analysis completed for Case #2024-001',
      details: 'Processed 45,231 call records, identified 12 suspects',
      officer: 'CI Sharma',
      status: 'completed'
    },
    {
      id: 3,
      timestamp: '2024-03-20 14:15:22',
      type: 'info',
      category: 'File Upload',
      message: 'New IPDR dataset uploaded successfully',
      details: 'IPDR_Session_Log_March.xlsx - 12,567 records processed',
      officer: 'ASI Patel',
      status: 'completed'
    },
    {
      id: 4,
      timestamp: '2024-03-20 13:45:18',
      type: 'alert',
      category: 'Geospatial Analysis',
      message: 'Unusual tower switching pattern detected',
      details: 'Target moved through 8 towers in 30 minutes - possible evasion',
      officer: 'SI Kumar',
      status: 'urgent'
    },
    {
      id: 5,
      timestamp: '2024-03-20 13:30:12',
      type: 'success',
      category: 'Timeline Generation',
      message: 'Suspect movement timeline created',
      details: 'Generated comprehensive timeline for suspect ID: S-2024-045',
      officer: 'CI Sharma',
      status: 'completed'
    },
    {
      id: 6,
      timestamp: '2024-03-20 12:55:33',
      type: 'info',
      category: 'Data Export',
      message: 'Analysis report exported to PDF',
      details: 'CDR_Analysis_Report_Case001.pdf generated and saved',
      officer: 'ASI Patel',
      status: 'completed'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>;
      case 'reviewing':
        return <Badge variant="default">Reviewing</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filters = [
    { id: 'all', label: 'All Activities', count: activities.length },
    { id: 'alert', label: 'Alerts', count: activities.filter(a => a.type === 'alert').length },
    { id: 'success', label: 'Completed', count: activities.filter(a => a.type === 'success').length },
    { id: 'info', label: 'Information', count: activities.filter(a => a.type === 'info').length },
  ];

  const filteredActivities = selectedFilter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === selectedFilter);

  return (
    <div className="p-6 space-y-6">
      {/* Header and Controls */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Activity Log</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Log
              </Button>
              <Button size="sm" variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search activities, officers, or case numbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
            
            {/* Filters */}
            <div className="flex space-x-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  size="sm"
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  onClick={() => setSelectedFilter(filter.id)}
                  className="flex items-center space-x-1"
                >
                  <span>{filter.label}</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity List */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-0">
          <div className="divide-y divide-slate-700">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-slate-700/30 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-white font-medium">{activity.message}</h3>
                        {getStatusBadge(activity.status)}
                      </div>
                      <span className="text-sm text-slate-400">{activity.timestamp}</span>
                    </div>
                    
                    <p className="text-sm text-slate-300 mb-3">{activity.details}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <span>Category: {activity.category}</span>
                        <span>Officer: {activity.officer}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="text-xs">
                          View Details
                        </Button>
                        {activity.status === 'reviewing' && (
                          <Button size="sm" variant="outline" className="text-xs">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Today's Activities</p>
                <p className="text-2xl font-bold text-white">47</p>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pending Alerts</p>
                <p className="text-2xl font-bold text-red-400">8</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Completed Tasks</p>
                <p className="text-2xl font-bold text-green-400">23</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Officers</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <Info className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
