
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Upload, User, Heart, Activity, FileText } from 'lucide-react';

interface HealthProfileProps {
  onBack: () => void;
}

export const HealthProfile = ({ onBack }: HealthProfileProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    basicInfo: { name: '', age: '', gender: '', weight: '', height: '' },
    gutHistory: '',
    allergies: [],
    conditions: [],
    hormonal: '',
    medications: ''
  });

  const steps = [
    { id: 1, title: 'Basic Information', icon: User },
    { id: 2, title: 'Medical History', icon: Heart },
    { id: 3, title: 'Current Health', icon: Activity },
    { id: 4, title: 'Documents', icon: FileText }
  ];

  const allergies = [
    'Nuts', 'Dairy', 'Gluten', 'Shellfish', 'Eggs', 'Soy', 'Fish', 'Seeds'
  ];

  const conditions = [
    'Diabetes', 'Hypertension', 'Thyroid Issues', 'Heart Disease', 'Kidney Disease', 'Liver Disease'
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-base font-medium">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter full name"
                  className="mt-2 text-lg py-3"
                  value={formData.basicInfo.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    basicInfo: { ...prev.basicInfo, name: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="age" className="text-base font-medium">Age</Label>
                <Input 
                  id="age" 
                  type="number" 
                  placeholder="Enter age"
                  className="mt-2 text-lg py-3"
                  value={formData.basicInfo.age}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    basicInfo: { ...prev.basicInfo, age: e.target.value }
                  }))}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight" className="text-base font-medium">Weight (kg)</Label>
                <Input 
                  id="weight" 
                  type="number" 
                  placeholder="Enter weight"
                  className="mt-2 text-lg py-3"
                  value={formData.basicInfo.weight}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    basicInfo: { ...prev.basicInfo, weight: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="height" className="text-base font-medium">Height (cm)</Label>
                <Input 
                  id="height" 
                  type="number" 
                  placeholder="Enter height"
                  className="mt-2 text-lg py-3"
                  value={formData.basicInfo.height}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    basicInfo: { ...prev.basicInfo, height: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Food Allergies & Intolerances</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                {allergies.map((allergy) => (
                  <div key={allergy} className="flex items-center space-x-2">
                    <Checkbox 
                      id={allergy}
                      checked={formData.allergies.includes(allergy)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData(prev => ({
                            ...prev,
                            allergies: [...prev.allergies, allergy]
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            allergies: prev.allergies.filter(a => a !== allergy)
                          }));
                        }
                      }}
                    />
                    <Label htmlFor={allergy} className="text-sm">{allergy}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="gutHistory" className="text-base font-medium">Digestive Health History</Label>
              <Textarea 
                id="gutHistory"
                placeholder="Describe any digestive issues, surgeries, or relevant medical history..."
                className="mt-2 min-h-24 text-base"
                value={formData.gutHistory}
                onChange={(e) => setFormData(prev => ({ ...prev, gutHistory: e.target.value }))}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Current Health Conditions</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                {conditions.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox 
                      id={condition}
                      checked={formData.conditions.includes(condition)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData(prev => ({
                            ...prev,
                            conditions: [...prev.conditions, condition]
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            conditions: prev.conditions.filter(c => c !== condition)
                          }));
                        }
                      }}
                    />
                    <Label htmlFor={condition} className="text-sm">{condition}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="hormonal" className="text-base font-medium">Hormonal Health</Label>
              <Textarea 
                id="hormonal"
                placeholder="Note any hormonal conditions like PCOD, menopause, thyroid issues..."
                className="mt-2 min-h-20 text-base"
                value={formData.hormonal}
                onChange={(e) => setFormData(prev => ({ ...prev, hormonal: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="medications" className="text-base font-medium">Current Medications</Label>
              <Textarea 
                id="medications"
                placeholder="List all current medications, supplements, and dosages..."
                className="mt-2 min-h-20 text-base"
                value={formData.medications}
                onChange={(e) => setFormData(prev => ({ ...prev, medications: e.target.value }))}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Lab Reports & Documents</h3>
              <p className="text-gray-600 mb-6">Upload recent lab reports, medical documents, or images (PDF, JPEG, PNG)</p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Upload className="h-5 w-5 mr-2" />
                  Choose Files
                </Button>
                <p className="text-sm text-gray-500 mt-2">Or drag and drop files here</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Document Guidelines:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Recent blood work and lab results</li>
                <li>• Surgical reports or discharge summaries</li>
                <li>• Current prescription lists</li>
                <li>• Imaging reports (CT, MRI, X-rays)</li>
                <li>• Maximum file size: 10MB per file</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Health Profile Setup</h1>
              <p className="text-gray-600">Step {currentStep} of {steps.length}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center mb-2
                    ${isActive ? 'bg-green-600 text-white' : isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}
                  `}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block absolute h-px w-24 mt-6 ml-24 ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription className="text-base">
              {currentStep === 1 && "Let's start with some basic information about the patient"}
              {currentStep === 2 && "Help us understand the medical history and dietary restrictions"}
              {currentStep === 3 && "Current health status and ongoing treatments"}
              {currentStep === 4 && "Upload relevant medical documents and lab reports"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-3"
          >
            Previous
          </Button>
          
          {currentStep < steps.length ? (
            <Button 
              onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
            >
              Next Step
            </Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3">
              Complete Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
