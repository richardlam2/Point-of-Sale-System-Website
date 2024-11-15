<script>
  import { Accordion, AccordionItem, Table, tableMapperValues, getToastStore } from "@skeletonlabs/skeleton";
  import { CreditCard } from "lucide-svelte"
  import { goto } from '$app/navigation';
  export let data;
  const toastStore = getToastStore();

  $: console.log(data);

  const tableData = {
    head: ['Item', 'Category', 'Price'],
    body: tableMapperValues(data.body.products, ['Name', 'product_category', 'Price']),
    foot: ['Total', '', `$${data.body.products.reduce((acc, obj) => {
      return acc + obj.Price;
    }, 0).toFixed(2)
    }`]
  };

  let purchaseData = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    nameOnCard: "",
    expirationDateMonth: "11",
    expirationDateYear: "2023",
    cardZipCode: "",
    totalCost: data.body.products.reduce((acc, obj) => {
      return acc + obj.Price;
    }, 0)
  };

  async function onSubmit() {
    if(validatePurchase()) {
      const res = await fetch('/api/CompletePurchase', {
        method: 'POST',
        body: JSON.stringify({
          transactionInformation: purchaseData,
          products: data.body.products.map(obj => obj.ProductId)
        })
      });

      const responseBody = await res.json();
    
      if(responseBody?.body?.errorMessage != null) {
        const toastSettings = {
          message: responseBody.body.errorMessage,
          background: 'variant-filled-error'
        }

        toastStore.trigger(toastSettings);
      } else {
        const toastSettings = {
          message: "Successfully purchased items",
          background: 'variant-filled-success'
        }

        toastStore.trigger(toastSettings);
        goto('/');	
      }
    }
  }

  function validatePurchase() {
    var validationErrors = '';

    if(purchaseData.firstName === "") {
      validationErrors += "<li>Please enter a first name for the shipping address</li>";
    }

    if(purchaseData.lastName === "") {
      validationErrors += "<li>Please enter a last name for the shipping address</li>";
    }

    if(purchaseData.address === "") {
      validationErrors += "<li>Please enter an address</li>";
    }

    if(purchaseData.city === "") {
      validationErrors += "<li>Please enter a city</li>";
    }

    if(purchaseData.state === "") {
      validationErrors += "<li>Please enter a state</li>";
    }

    if(purchaseData.zipCode === "") {
      validationErrors += "<li>Please enter a Zip Code for the shipping address</li>";
    }

    if(purchaseData.cardNumber === "") {
      validationErrors += "<li>Please enter a card number</li>";
    }

    if(purchaseData.nameOnCard === "") {
      validationErrors += "<li>Please enter the name for the card</li>";
    }

    if(purchaseData.expirationDateMonth === "") {
      validationErrors += "<li>Please enter an expiration date month for the card</li>";
    }

    if(purchaseData.expirationDateYear === "") {
      validationErrors += "<li>Please enter an expiration date year for the card</li>";
    }

    if(purchaseData.cardZipCode === "") {
      validationErrors += "<li>Please enter a Zip Code for the card</li>";
    }

    if(validationErrors !== "") {
      const toastSettings = {
        message: `<ul>${validationErrors}</ul>`,
        background: 'variant-filled-error'
      }

      toastStore.trigger(toastSettings);

      return false;
    }

    return true;
  }

</script>

<div class="w-3/4 ml-auto mr-auto mt-3">
  <Accordion regionControl="bg-slate-700 font-black" regionPanel="bg-slate-600">
  <AccordionItem open>
    <svelte:fragment slot="summary">Review Items</svelte:fragment>
    <svelte:fragment slot="content">
      <Table source={tableData} />
    </svelte:fragment>
  </AccordionItem>
  <AccordionItem open>
    <svelte:fragment slot="summary">Shipping</svelte:fragment>
    <svelte:fragment slot="content">
      <div id="ShippingInfoContainer" class="flex min-h-full flex-col justify-center px-5 pb-4 lg:px-8">
        <div class="flex flex-wrap -mx-3 mb-1">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="FirstName">
              First Name
            </label>
            <input class="text-slate-700 appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="FirstName" type="text" placeholder="Jane" bind:value={purchaseData.firstName}>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide  text-xs font-bold mb-2" for="LastName">
              Last Name
            </label>
            <input class="text-slate-700 appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="LastName" type="text" placeholder="Doe" bind:value={purchaseData.lastName}>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-4">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide  text-xs font-bold mb-2" for="Address">
              Address
            </label>
            <input class="text-slate-700 appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Address" type="text" bind:value={purchaseData.address}>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide  text-xs font-bold mb-2" for="City">
              City
            </label>
            <input class="text-slate-700 appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="City" type="text" placeholder="Houston" bind:value={purchaseData.city}>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide  text-xs font-bold mb-2" for="State">
              State
            </label>
            <div class="relative">
              <input class="text-slate-700 appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="State" type="text" placeholder="Texas" bind:value={purchaseData.state}>
            </div>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide  text-xs font-bold mb-2" for="ZipCode">
              Zip
            </label>
            <input class="text-slate-700 appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="ZipCode" type="text" placeholder="77003" bind:value={purchaseData.zipCode}>
          </div>
        </div>
      </div>
    </svelte:fragment>
  </AccordionItem>
  <AccordionItem open>
    <svelte:fragment slot="summary">Payment Method</svelte:fragment>
      <svelte:fragment slot="content">
      <div id="PaymentMethodContainer" class="flex min-h-full flex-col justify-center px-6 lg:px-8">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide  text-xs font-bold mb-2" for="CardNumber">
              Card Number 
            </label>
            <input class="text-slate-700 appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="CardNumber" type="text" bind:value={purchaseData.cardNumber}>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-6/12 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide  text-xs font-bold mb-2" for="NameOnCard">
              Name on card 
            </label>
            <input class="text-slate-700 appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="NameOnCard" type="text" bind:value={purchaseData.nameOnCard}>
          </div>
          <div class="w-full md:w-4/12">
            <label class="block uppercase tracking-wide  text-xs font-bold mb-2" for="ExpirationDate">
              Expiration Date 
            </label>
            <select class="inline-block appearance-none w-1/3 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" bind:value={purchaseData.expirationDateMonth}>
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
              <option>05</option>
              <option>06</option>
              <option>07</option>
              <option>08</option>
              <option>09</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
            <select class="ml-3 inline-block appearance-none w-7/12 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4  rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" bind:value={purchaseData.expirationDateYear}>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
              <option>2027</option>
              <option>2028</option>
              <option>2029</option>
              <option>2030</option>
              <option>2031</option>
              <option>2032</option>
              <option>2033</option>
              <option>2034</option>
              <option>2035</option>
            </select>
          </div>
          <div class="w-full md:w-2/12 px-3">
            <label class="block uppercase tracking-wide  text-xs font-bold mb-2" for="CardZipCode">
              Zip
            </label>
            <input class="text-slate-700 appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="CardZipCode" type="text" placeholder="77003" bind:value={purchaseData.cardZipCode}>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-4 ">
          <div class="w-full px-3">
            <button type="button" class="float-right btn variant-filled" on:click={onSubmit}>
              <CreditCard />
              <span>Complete Checkout</span>
            </button>
          </div>
        </div>
      </div>
      </svelte:fragment>
  </AccordionItem>
  </Accordion>
</div>
