<script lang="ts">
    const dummtGroup = [
        {
            group_id : 1,
            group_name : "Group 1",
            group_avatar : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        },
        {
            group_id : 2,
            group_name : "Group 2",
            group_avatar : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        },
        {
            group_id : 3,
            group_name : "Group 3",
            group_avatar : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        },
    ]
</script>

<div class="flex flex-col gap-2 overflow-y-auto p-2">
    {#each dummtGroup as group (group.group_id)}
        <button
            class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            on:click={() => console.log(`Clicked ${group.group_name}`)}
        >
            <!-- Avatar -->
            <img 
                src={group.group_avatar} 
                alt={group.group_name} 
                class="w-10 h-10 rounded-full object-cover border border-gray-200"
            />

            <!-- Group Name -->
            <p class="font-medium text-gray-800">{group.group_name}</p>
        </button>
    {/each}
</div>
