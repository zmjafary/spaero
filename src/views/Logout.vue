<template>
</template>
  
  <script setup lang="ts">
    import authService from '@/services/authService';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const logout = async () => {
        await authService.logout();
        router.push('/home');
    };

    logout();
</script>
  