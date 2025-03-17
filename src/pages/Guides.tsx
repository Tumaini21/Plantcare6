import React, { useState } from 'react';
import { BookOpen, ChevronRight, Leaf, Bug, Droplet, Sun, Thermometer } from 'lucide-react';

interface Guide {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  topics: Array<{
    title: string;
    content: string;
  }>;
}

const guides: Guide[] = [
  {
    id: '1',
    title: 'Basic Plant Care',
    description: 'Master the fundamentals of indoor plant care',
    icon: Leaf,
    topics: [
      {
        title: 'Watering Basics',
        content: 'Most indoor plants need to be watered when the top 1-2 inches of soil feels dry. Always check the soil moisture before watering. Water thoroughly until it drains from the bottom, and never let plants sit in standing water.',
      },
      {
        title: 'Light Requirements',
        content: 'Different plants have different light needs. Most houseplants prefer bright, indirect light. Direct sunlight can burn leaves, while too little light can stunt growth. Rotate plants regularly for even growth.',
      },
      {
        title: 'Soil & Fertilizing',
        content: 'Use well-draining potting mix specific to your plant type. Fertilize during the growing season (spring and summer) with a balanced, water-soluble fertilizer diluted to half strength.',
      },
    ],
  },
  {
    id: '2',
    title: 'Common Plant Problems',
    description: 'Identify and solve typical plant issues',
    icon: Bug,
    topics: [
      {
        title: 'Pest Management',
        content: 'Common pests include spider mites, mealybugs, and fungus gnats. Inspect plants regularly, isolate infected plants, and treat with neem oil or insecticidal soap.',
      },
      {
        title: 'Disease Prevention',
        content: 'Prevent fungal diseases by avoiding overwatering, improving air circulation, and maintaining proper humidity. Remove affected leaves promptly to prevent spread.',
      },
      {
        title: 'Environmental Stress',
        content: 'Signs include leaf yellowing, brown tips, or wilting. Usually caused by improper watering, light, or temperature. Adjust care routine based on symptoms.',
      },
    ],
  },
  {
    id: '3',
    title: 'Watering Guide',
    description: 'Learn proper watering techniques',
    icon: Droplet,
    topics: [
      {
        title: 'Watering Frequency',
        content: 'Factors affecting watering frequency include plant type, pot size, humidity, and season. Most plants need less water in winter.',
      },
      {
        title: 'Water Quality',
        content: 'Use room temperature water. Some plants are sensitive to tap water chemicals - consider using filtered or rainwater.',
      },
      {
        title: 'Common Mistakes',
        content: 'Avoid overwatering, which can lead to root rot. Don\'t water on a strict schedule - check soil moisture instead.',
      },
    ],
  },
  {
    id: '4',
    title: 'Light & Temperature',
    description: 'Optimize growing conditions',
    icon: Sun,
    topics: [
      {
        title: 'Light Levels',
        content: 'Low light: 2-3 feet from north window. Medium light: east/west window. Bright light: south window with filtered light.',
      },
      {
        title: 'Temperature Control',
        content: 'Most houseplants thrive between 65-75°F (18-24°C). Avoid cold drafts and sudden temperature changes.',
      },
      {
        title: 'Humidity Management',
        content: 'Group plants together, use pebble trays, or run a humidifier to increase humidity. Most tropical plants prefer 40-60% humidity.',
      },
    ],
  },
];

export function GuidesPage() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Plant Care Guides</h1>
        <p className="mt-1 text-gray-600">Learn everything about caring for your plants</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {guides.map((guide) => (
          <button
            key={guide.id}
            onClick={() => setSelectedGuide(guide)}
            className="flex items-start rounded-lg bg-white p-6 shadow transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <guide.icon className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-medium text-gray-900">{guide.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{guide.description}</p>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <span>Learn more</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedGuide && (
        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <div className="mb-6 flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <selectedGuide.icon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{selectedGuide.title}</h2>
              <p className="text-gray-600">{selectedGuide.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            {selectedGuide.topics.map((topic, index) => (
              <div key={index} className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-medium text-gray-900">{topic.title}</h3>
                <p className="text-gray-600">{topic.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}