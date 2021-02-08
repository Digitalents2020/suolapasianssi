<script>
  import { writable } from "svelte/store";
  import { Game } from "./model";

  import Card from "./Card.svelte";

  let g = writable(new Game());
</script>

<svelte:head>
  <link
    href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
    rel="stylesheet"
  /></svelte:head
>

<div class="absolute right-0 h-full flex flex-row items-center">
  <button
    class="w-32 h-48 m-2 rounded-lg shadow-lg bg-white"
    on:click={() => {
      $g.addCardFromDeck();
      g.set($g);
    }}
  >
    kortteja
  </button>
</div>

<div class="flex flex-row w-full">
  {#each $g.table as card, i}
    <Card
      {card}
      onClick={() => {
        $g.moveCardToHand(i);
        g.set($g);
      }}
    />
  {/each}
  {#if $g.gotSalt()}
    <button
      class="w-48 h-48 m-2 text-8xl bg-pink-400 text-white rounded-full"
      on:click={() => {
        $g.takeSalt();
        g.set($g);
      }}
    >
      +
    </button>
  {/if}
</div>

<div class="flex flex-row absolute bottom-0 w-full">
  {#each $g.hand as card, i}
    <Card
      {card}
      onClick={() => {
        $g.moveCardToTable(i);
        g.set($g);
      }}
    />
  {/each}
</div>

<div class="absolute text-6xl right-0 top-0 m-2">
  {$g.score}
</div>

<style>
  :global(body) {
    background-color: #eee;
    overflow: hidden;
  }
</style>
