export interface Meeting {
  id: number;
  title: string;
  description: string;
  status: string;
  duration: string;
  projectId?: number;
  create_at: string;
}

export interface CreateMeetingResponse {
  id: number;
  title: string;
  description: string;
  status: string;
  duration: string;
  projectId?: number;
  create_at: string;
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

export type CreateMeetingPayload = {
  title: string;
  file?: File | null;
  projectId?: number;
  description: string;
  duration: string;
  link?: string | null;
};

export type useMeetingResponse = {
  id: string;
  uploaded_by: string;
  title: string;
  file: File;
  create_at: string;
  duration: string;
  status: 'В обработке' | 'Обработан';
  project: {
    id: number;
    name: string;
  };
};
