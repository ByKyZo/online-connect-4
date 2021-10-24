<script lang="ts">
    import { useNavigate } from 'svelte-navigator';
    import { get } from 'svelte/store';
    import { user } from '../store/user.store';
    const { isConnected } = user;

    const navigate = useNavigate();

    !get(isConnected) && navigate('/');
</script>

<style>
</style>
