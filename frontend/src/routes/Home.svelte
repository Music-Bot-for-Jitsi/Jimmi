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
      password: "",
    },
    validationSchema: yup.object().shape({
      domain: yup.string().trim().matches(domainRegex),
      room: yup.string().trim().min(1).matches(jitsiRoomRegex).required(),
      password: yup.string().optional(),
    }),
    onSubmit: (values) => {
      const password = values.password ? `?password=${values.password}` : '';
      push(`/bot/${href}${password}`);
    },
  });

  /**
   * EventHandler for onBeforeInput event. If a complete jitsi url is pasted into the input field,
   * the domain and conference are extracted automatically.
   *
   * @param event - The onBeforeInput event
   */
  function beforeInput(event: Event) {
    if (event instanceof InputEvent && event.data && event.inputType === "insertFromPaste") {
      const { data } = event;
      const urlRegex = new RegExp('^http(s?)://(.*)/(.*)$');
      if (!urlRegex.test(data)) return;
      const execArray = urlRegex.exec(data);
      if (!(execArray && execArray.length >= 4)) return;
      const domain = execArray[2];
      const conference = execArray[3];
      if (domainRegex.test(domain) && jitsiRoomRegex.test(conference)) {
        event.preventDefault();
        $form.domain = domain;
        $form.room = conference;
      }
    }
  }

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
          on:beforeinput={beforeInput}
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
          on:beforeinput={beforeInput}
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

      <div class="relative mb-4">
        <details>
          <summary class="cursor-pointer">{$_("general.advancedConfiguration")}</summary>
          <label for="domain" class="leading-7 text-sm text-gray-600"
            >{$_("general.password")}</label
          >
          <input
            type="password"
            id="password"
            name="password"
            on:change={handleChange}
            bind:value={$form.password}
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </details>
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
