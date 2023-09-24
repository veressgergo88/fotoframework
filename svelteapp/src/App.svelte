<script lang="ts">
  import { loadImages } from "./lib/api";

  type Image = {
    id: number;
    title: string;
    url: string;
    smallAmount: number;
    largeAmount: number;
  };

  let isLoading = false;
  let notificationText: string | null = null;
  let images: Image[] = [];

  let page = "home"

  let searchParam = ""

  const search = async () => {
    isLoading = true
    const response = await loadImages(searchParam)
    isLoading = false
    if (!response.success)
      return notificationText = response.error
    const data = response.data
    images = data.map(img => ({...img, smallAmount: 0, largeAmount: 0}))
    notificationText = null
  }

</script>

<main>
  <div class="card">

    {#if page === "home"}
      <div>
        <button on:click={() => page = "about"}>To about</button>
        <input type="text" placeholder="Title" bind:value={searchParam}>
        <button on:click={() => searchParam = ""}>Clear</button>
        <button on:click={search}>Search</button>

        {#if isLoading}
          <p>Loading...</p>
          {:else}
            
          {#each images as image}
            <p>{ image.title }</p>
            <img src={ image.url } alt={ image.title }>
          {/each}
        {/if}

        {#if notificationText}
          <h1>{ notificationText }</h1>
        {/if}

      </div> 
    {/if}

    {#if page === "about"}
      <div>
        <button on:click={() => page = "home"}>To Home</button>
      
      </div>
    {/if}

  </div>
</main>
