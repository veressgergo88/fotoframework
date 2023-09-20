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

  const search = async () => {
    isLoading = true
    const response = await loadImages()
    isLoading = false
    if (!response.success)
      return notificationText = response.error
    const data = response.data
    images = data.map(img => ({...img, smallAmount: 0, largeAmount: 0}))
  }

</script>

<main>
</main>
