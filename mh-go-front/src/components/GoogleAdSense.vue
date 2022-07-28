<template>
  <div :class="classNames">
    <ins
      :className="adsbygoogle"
      :style="{display: 'block'}"
      :data-ad-client="googleAdId"
      :data-ad-slot="adSlot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script>
    export default {
    name: "GoogleAdSense",
    props: {
        timeout: Number,
        classNames: String,
        adSlot: String
    },
    data() {
        return {
        googleInit: null,
        googleAdId: "ca-pub-5148109115547862"
        };
    },
    mounted() {
        let timeout = 200;
        if(this.timeout) timeout = this.timeout;
        this.googleInit = setTimeout(() => {
        if (typeof window !== "undefined")
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }, timeout);
    },
    unmounted() {
        if (this.googleInit) clearTimeout(this.googleInit);
    }
    };

</script>
