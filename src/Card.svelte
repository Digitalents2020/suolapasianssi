<script>
  export let card;
  export let onClick;

  const oxidation = (value) => {
    if (value === 0) {
      return "";
    }

    return Math.abs(value) + (value < 0 ? "-" : "+");
  };
</script>

<button
  class="w-32 h-48 rounded-lg bg-white shadow-lg p-6 m-2 relative overflow-hidden bg-cover bg-center"
  style={`background-image:url(https://source.unsplash.com/collection/139386?${card.symbol})`}
  on:click={onClick}
>
  <div
    class="text-center text-2xl pt-2 bg-white opacity-80 absolute left-0 bottom-0 right-0 w-full"
  >
    <span class="font-bold">{card.symbol}</span><sup class="text-gray-500"
      >{oxidation(card.oxidation)}</sup
    >
  </div>
</button>
