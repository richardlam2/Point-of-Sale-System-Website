<script>
  import { getToastStore } from '@skeletonlabs/skeleton';
  import { enhance } from '$app/forms'
  export let form;

  $: if(form?.message) {
    const errorToast = {
      message: form.message,
      timeout: 5000,
      background: 'variant-filled-error'
    };

    toastStore.trigger(errorToast);
  }

  const toastStore = getToastStore();

  function validateNewAccount(e) {
    let errorMessage = "";
    
    if(document.getElementById("email").value !== document.getElementById("ConfirmEmail").value)
      errorMessage += "<li>Email addresses do not match.</li>";
    
    if(getAge(document.getElementById("DateOfBirth").value) < 18)
      errorMessage += "<li>Must be 18 years old to create an account.</li>";

    if(errorMessage !== "") {
      const errorToast = {
        message: `<ul>${errorMessage}</ul>`,
        timeout: 5000,
        background: 'variant-filled-error'
      };

      toastStore.trigger(errorToast);

      return false;
    }

    return true;
  }

  function getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
  }
</script>

<div id="LoginContainer" class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Create Account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form id="RegisterAccountForm" class="space-y-2" method="POST" use:enhance={({cancel}) => {
                                                                                      if(!validateNewAccount())
                                                                                      cancel();
        }}>
          <div>
            <label for="email" class="block text-sm font-medium leading-6">Email Address:</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>
    
          <div>
            <label for="ConfirmEmail" class="block text-sm font-medium leading-6">Confirm Email Address</label>
            <div class="mt-2">
              <input id="ConfirmEmail" name="ConfirmEmail" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div>
            <div>
              <label for="FirstName" class="block text-sm font-medium leading-6">First Name:</label>
              <div class="mt-2">
                <input id="FirstName" name="FirstName" type="text"  required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
            </div>
          </div>

          <div>
            <div>
              <label for="LastName" class="block text-sm font-medium leading-6">Last Name:</label>
              <div class="mt-2">
                <input id="LastName" name="LastName" type="text"  required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
            </div>
          </div>

          <div>
            <div>
              <label for="DateOfBirth" class="block text-sm font-medium leading-6">Date of Birth:</label>
              <div class="mt-2">
                <input id="DateOfBirth" name="DateOfBirth" type="date"  required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6">Password:</label>
            </div>
            <div class="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>
    
          <div>
            <button type="submit" class="mt-6 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
          </div>
        </form>
    
        <p class="mt-10 text-center text-sm">
          Already have an account?
          <a href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Log In</a>
        </p>
      </div>
</div>
