import { toast } from 'react-toastify';
import { useAuthStore } from '../stores/authStore';
import type { AxiosError } from 'axios';

const showErrorToast = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    containerId: 'main-toast'
  });
};

const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
    containerId: 'main-toast'
  });
};

const showInfoToast = (message: string) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    containerId: 'main-toast'
  });
};

export const handleApiError = (error: AxiosError) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        if (error.config?.url === '/login') {
          showErrorToast('Неверный email или пароль');
          break;
        } else {
          useAuthStore.getState().logout();
          showErrorToast('Сессия истекла. Пожалуйста, войдите заново');
          window.location.href = '/login';
        }
        break;
      case 403:
        showErrorToast('Доступ запрещен');
        break;
      case 404:
        showErrorToast('Ресурс не найден');
        break;
      case 500:
        showErrorToast('Ошибка сервера. Попробуйте позже');
        break;
      default:
        showErrorToast(error.message || 'Произошла ошибка');
    }
  } else if (error.request) {
    showErrorToast('Произошла ошибка');
  } else {
    showErrorToast('Произошла ошибка');
  }
};

export const ToastService = {
  error: showErrorToast,
  success: showSuccessToast,
  info: showInfoToast
};
