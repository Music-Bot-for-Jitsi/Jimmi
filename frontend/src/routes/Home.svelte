<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { push } from "svelte-spa-router";
  import { _ } from "svelte-i18n";

  const domainRegex = new RegExp(
    /^$|^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/
  );
  const jitsiRoomRegex = new RegExp(/^[^?&:"'%#]+$/); // only given characters are excluded

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      domain: "",
      room: "",
    },
    validationSchema: yup.object().shape({
      domain: yup.string().trim().matches(domainRegex),
      test: yup.string(),
      room: yup.string().trim().min(1).matches(jitsiRoomRegex).required(),
    }),
    onSubmit: (values) => {
      push(`/bot/${href}`);
    },
  });

  $: href = `${$form.domain || "meet.jit.si"}/${$form.room}`;
</script>

<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 class="title-font font-medium text-3xl text-gray-900">
        {$_("routes.home.mainContent.heading")}
      </h1>
      <p class="leading-relaxed mt-4">
        {$_("routes.home.mainContent.description")}
      </p>
    </div>
    <form
      on:submit={handleSubmit}
      class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
    >
      <h2 class="text-gray-900 text-lg font-medium title-font mb-5">
        {$_("routes.home.joinRoomHeading")}
      </h2>
      <div class="relative mb-4">
        <label for="domain" class="leading-7 text-sm text-gray-600"
          >{$_("routes.home.domainLabel")}</label
        >
        <input
          type="text"
          id="domain"
          name="domain"
          on:change={handleChange}
          bind:value={$form.domain}
          placeholder="meet.jit.si"
          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {#if $errors.domain}
          <p class="text-xs text-red-500 mt-3">
            {$_("routes.home.domainError")}
          </p>
        {/if}
      </div>
      <div class="relative mb-4">
        <label for="room" class="leading-7 text-sm text-gray-600"
          >{$_("routes.home.roomLabel")}</label
        >
        <input
          type="text"
          id="room"
          name="room"
          on:change={handleChange}
          bind:value={$form.room}
          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {#if $errors.room}
          <p class="text-xs text-red-500 mt-3">
            {$_("routes.home.roomError")}
          </p>
        {/if}
      </div>
      <button
        class="disabled:opacity-50 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        type="submit">{$_("routes.home.joinButtonText")}</button
      >
      <p class="text-xs text-gray-500 mt-3">
        {$_("routes.home.joinRoomFootnote")}
        <a class="text-indigo-500 break-words" href={`https://${href}`}>
          {href}
        </a>
      </p>
    </form>
  </div>
</section>
