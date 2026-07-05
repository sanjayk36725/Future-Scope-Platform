import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Create a centralized Axios client targeting our Express API route mapping
export const apiClient: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configure Request Interceptor to append the JWT authorization token automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fsp_session_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Configure Response Interceptor for handling structural failures and token refreshes
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.warn('[API Client] Unauthorized - clear session credentials or redirect to login');
        // Standard JWT expiry handling
        localStorage.removeItem('fsp_session_token');
        localStorage.removeItem('fsp_session_user');
      }
    }
    return Promise.reject(error);
  }
);

// Helper factory to generate modular, fully typed boilerplate CRUD methods for our custom collections
export const createCrudService = <T = any>(collection: string) => {
  return {
    getAll: async (params?: any): Promise<{ data: T[]; total?: number }> => {
      const response = await apiClient.get<{ data: T[]; total?: number }>(`/${collection}`, { params });
      return response.data;
    },
    getById: async (id: string): Promise<T> => {
      const response = await apiClient.get<T>(`/${collection}/${id}`);
      return response.data;
    },
    create: async (data: Partial<T>): Promise<T> => {
      const response = await apiClient.post<T>(`/${collection}`, data);
      return response.data;
    },
    update: async (id: string, data: Partial<T>): Promise<T> => {
      const response = await apiClient.put<T>(`/${collection}/${id}`, data);
      return response.data;
    },
    delete: async (id: string): Promise<T> => {
      const response = await apiClient.delete<T>(`/${collection}/${id}`);
      return response.data;
    },
  };
};

/**
 * 1. Authentication Services
 */
export const authService = {
  login: async (email: string, role: string): Promise<{ user: any; token: string }> => {
    const response = await apiClient.post<{ user: any; token: string }>('/auth/login', { email, role });
    return response.data;
  },
  updateProfile: async (data: { id: string; name: string; email: string; avatarUrl?: string; department?: string }): Promise<{ user: any }> => {
    const response = await apiClient.post<{ user: any }>('/auth/profile', data);
    return response.data;
  },
};

/**
 * 2. AI & LLM Assistants Integration Services
 */
export const aiService = {
  chat: async (prompt: string, agentId: string, userId?: string): Promise<{ reply: string; message: any }> => {
    const response = await apiClient.post<{ reply: string; message: any }>('/ai/chat', { prompt, agentId, userId });
    return response.data;
  },
};

/**
 * 3. File Uploads Services
 */
export const uploadService = {
  upload: async (fileName: string, fileContent: string, fileType?: string, userId?: string): Promise<{ success: boolean; url: string; fileName: string; safeName: string }> => {
    const response = await apiClient.post<{ success: boolean; url: string; fileName: string; safeName: string }>('/upload', {
      fileName,
      fileContent,
      fileType,
      userId,
    });
    return response.data;
  },
};

/**
 * 4. Database Collections Modular Services
 */
export const assignmentsService = createCrudService<any>('assignments');
export const quizzesService = createCrudService<any>('quizzes');
export const coursesService = createCrudService<any>('courses');
export const leavesService = createCrudService<any>('leaves');
export const payrollService = createCrudService<any>('payroll');
export const jobsService = createCrudService<any>('jobs');
export const candidatesService = createCrudService<any>('candidates');
export const interviewsService = createCrudService<any>('interviews');
export const booksService = createCrudService<any>('books');
export const hostelService = createCrudService<any>('hostel');
export const timetableService = createCrudService<any>('timetable');
export const notificationsService = createCrudService<any>('notifications');
export const feedbackService = createCrudService<any>('feedback');
export const labBookingsService = createCrudService<any>('labBookings');
export const codeProjectsService = createCrudService<any>('codeProjects');
export const helpdeskService = createCrudService<any>('helpdesk');
export const logsService = createCrudService<any>('logs');
export const settingsService = createCrudService<any>('settings');
