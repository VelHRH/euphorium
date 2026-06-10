<template>
  <div
    aria-hidden="true"
    class="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-background"
  >
    <div
      class="absolute"
      style="
        left: -15%;
        top: 30%;
        width: 90vmax;
        height: 90vmax;
        transform: translateY(-50%);
        background: radial-gradient(
          circle,
          color-mix(in oklch, var(--secondary) 10%, transparent) 0%,
          color-mix(in oklch, var(--secondary) 5%, transparent) 40%,
          transparent 70%
        );
      "
    />

    <div
      class="absolute"
      style="
        right: -15%;
        top: 55%;
        width: 90vmax;
        height: 90vmax;
        transform: translateY(-50%);
        background: radial-gradient(
          circle,
          color-mix(in oklch, var(--primary) 9%, transparent) 0%,
          color-mix(in oklch, var(--primary) 6%, transparent) 40%,
          transparent 70%
        );
      "
    />
  </div>
</template>
