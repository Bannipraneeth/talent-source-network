
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { BriefcaseIcon, UserIcon } from 'lucide-react';
import { toast } from 'sonner';

const Profile: React.FC = () => {
  const { user } = useAuth();
  
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: ''
  });
  
  const [professionalInfo, setProfessionalInfo] = useState({
    title: '',
    experience: '',
    education: '',
    skills: ''
  });
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value
    });
  };
  
  const handleProfessionalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfessionalInfo({
      ...professionalInfo,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile in MongoDB
    toast.success('Personal information updated successfully');
  };
  
  const handleSaveProfessionalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile in MongoDB
    toast.success('Professional information updated successfully');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                      <UserIcon className="h-12 w-12 text-gray-500" />
                    </div>
                    <h2 className="text-xl font-semibold">{user?.name}</h2>
                    <p className="text-gray-500">{user?.email}</p>
                    <Badge className="mt-2 capitalize">
                      {user?.role === 'seeker' ? 'Job Seeker' : 'Job Provider'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <UserIcon className="h-4 w-4 mr-2" />
                      My Profile
                    </Button>
                    
                    {user?.role === 'provider' ? (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href="/my-jobs">
                          <BriefcaseIcon className="h-4 w-4 mr-2" />
                          My Job Listings
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href="/saved-jobs">
                          <BriefcaseIcon className="h-4 w-4 mr-2" />
                          Saved Jobs
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal and professional information
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="personal">Personal Info</TabsTrigger>
                      <TabsTrigger value="professional">Professional Info</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="personal">
                      <form onSubmit={handleSavePersonalInfo} className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                              id="fullName"
                              name="fullName"
                              value={personalInfo.fullName}
                              onChange={handlePersonalInfoChange}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={personalInfo.email}
                              onChange={handlePersonalInfoChange}
                              required
                              disabled
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={personalInfo.phone}
                              onChange={handlePersonalInfoChange}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              name="location"
                              placeholder="City, State, Country"
                              value={personalInfo.location}
                              onChange={handlePersonalInfoChange}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            placeholder="Tell us a bit about yourself..."
                            value={personalInfo.bio}
                            onChange={handlePersonalInfoChange}
                            rows={4}
                          />
                        </div>
                        
                        <div className="flex justify-end">
                          <Button type="submit" className="bg-job-primary hover:bg-blue-600">
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="professional">
                      <form onSubmit={handleSaveProfessionalInfo} className="space-y-6 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Professional Title</Label>
                          <Input
                            id="title"
                            name="title"
                            placeholder="e.g. Frontend Developer"
                            value={professionalInfo.title}
                            onChange={handleProfessionalInfoChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="experience">Work Experience</Label>
                          <Textarea
                            id="experience"
                            name="experience"
                            placeholder="Describe your work experience..."
                            value={professionalInfo.experience}
                            onChange={handleProfessionalInfoChange}
                            rows={4}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="education">Education</Label>
                          <Textarea
                            id="education"
                            name="education"
                            placeholder="List your educational background..."
                            value={professionalInfo.education}
                            onChange={handleProfessionalInfoChange}
                            rows={3}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="skills">Skills</Label>
                          <Textarea
                            id="skills"
                            name="skills"
                            placeholder="List your key skills..."
                            value={professionalInfo.skills}
                            onChange={handleProfessionalInfoChange}
                            rows={3}
                          />
                        </div>
                        
                        <div className="flex justify-end">
                          <Button type="submit" className="bg-job-primary hover:bg-blue-600">
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
