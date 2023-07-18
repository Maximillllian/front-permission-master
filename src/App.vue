<template>
    <div class="root">
        <main class="root-main">
            <div class="scroll-container">
                <router-view/>
            </div>
        </main>
    </div>

    <Modals/>
</template>

<style src="./assets/styles/reset.css" lang="css"></style>
<style src="./assets/styles/_layout.scss" lang="scss"></style>
<style src="./assets/styles/ui.scss" lang="scss"></style>
<style src="./assets/styles/main.scss" lang="scss"></style>


<script>
    import Modals from "@/components/Modals";

    export default {
        name: "App",
        components: {
            Modals,
        },
    }
</script>


<style lang="scss">

</style>
