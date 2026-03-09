export interface CaseStudy {
  title: string;
  description: string;
  challenge: string;
  approach: string[];
  technologies: string[];
  results: string[];
  github: string | null;
  live: string | null;
  image: string; // Main project screenshot
  dashboardImages?: string[]; // Add dashboard screenshots array
  dashboardFeatures?: string[]; // Optional: specific dashboard features
}

export interface CaseStudies {
  [key: string]: CaseStudy;
}
