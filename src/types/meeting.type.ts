export interface Meeting {
  id: number;
  date: string;
  title: string;
  description: string;
  status: string;
  duration: string;
  projectId: number | null;
}

export type VideoMeeting = {
  id: number;
  title: string;
  description: string;
  project_id: number;
  uploaded_by: number;
  filename: string;
  mime_type: string;
  size: number;
};

export type VideoUploadResponse = {
  message: string;
  video: VideoMeeting;
};
