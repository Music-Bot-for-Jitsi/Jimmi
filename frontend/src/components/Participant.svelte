<script lang="ts">
  import type JitsiParticipant from "src/types/jitsi/JitsiParticipant";

  export let participant: JitsiParticipant;
</script>

<div class="flex items-center mb-3">
  <div
    class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0"
  >
    <svg
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      class="w-6 h-6"
      viewBox="0 0 24 24"
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  </div>
  <h2 class="text-gray-900 break-words text-lg title-font font-medium">
    {participant.getDisplayName()}
  </h2>
</div>
