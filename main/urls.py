from django.urls import path, include
from django.contrib.auth.views import LogoutView
from rest_framework.routers import DefaultRouter

from .views import *

app_name = 'main'

router = DefaultRouter()
router.register('tasks', APITaskViewSet)

urlpatterns = [
    path('api/tasks/<int:pk>/', api_task_detail),
    path('api/tasks/', api_tasks),

    path('api/', include(router.urls)),

    path('login/', NewLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    path('register/', RegisterPage.as_view(), name='register'),

    path('task_detail/<int:pk>/', TaskDetail.as_view(), name='tasks_detail'),
    path('task_update/<int:pk>/', TaskUpdate.as_view(), name='tasks_update'),
    path('task_delete/<int:pk>/', TaskDelete.as_view(), name='tasks_delete'),
    path('task_create/', TaskCreate.as_view(), name='task_create'),
    path('task_list', TaskList.as_view(), name='task_list'),
    path('', index, name='main'),
]
