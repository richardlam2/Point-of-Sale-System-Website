<script>
  import { enhance } from '$app/forms'
  import { DateTime } from 'luxon';
  import { getToastStore } from '@skeletonlabs/skeleton';
  export let data;
  const toastStore = getToastStore();

  var dateOfBirth = DateTime.fromISO(data.body.userInfo.DateOfBirth.toISOString()).toString().split('T')[0];

  const submit = () => {
    
    return async ({result}) => {
      if(result.status === 303) {
        const toastSettings = {
          message: "Successfully updated account",
          background: 'variant-filled-success'
        }

        toastStore.trigger(toastSettings);
      }
    }

  }
</script>

<div id="AccountInformationContainer" class="flex min-h-full flex-col  px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
        <h2 class="text-center text-2xl font-bold leading-9 tracking-tight">Edit Account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form id="RegisterAccountForm" class="space-y-2" method="POST" on:submit|preventDefault use:enhance={submit}>
          <div>
            <label for="email" class="block text-sm font-medium leading-6">Email Address:</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" bind:value={data.body.userInfo.Email} disabled>
            </div>
          </div>
    
          <div>
            <div>
              <label for="FirstName" class="block text-sm font-medium leading-6">First Name:</label>
              <div class="mt-2">
                <input id="FirstName" name="FirstName" type="text"  required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" bind:value={data.body.userInfo.FirstName}>
              </div>
            </div>
          </div>

          <div>
            <div>
              <label for="LastName" class="block text-sm font-medium leading-6">Last Name:</label>
              <div class="mt-2">
                <input id="LastName" name="LastName" type="text"  required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" bind:value={data.body.userInfo.LastName}>
              </div>
            </div>
          </div>

          <div>
            <div>
              <label for="DateOfBirth" class="block text-sm font-medium leading-6">Date of Birth:</label>
              <div class="mt-2">
                <input id="DateOfBirth" name="DateOfBirth" type="date"  required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" bind:value={dateOfBirth}>
              </div>
            </div>
          </div>
    
          <div>
            <button type="submit" class="mt-6 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
          </div>
        </form>
      </div>
</div>
