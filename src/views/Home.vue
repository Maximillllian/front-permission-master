<template>

    <button @click="createPermission">create</button>

</template>

<script>
    import API from "@/api/api";

    export default {
        name: 'Home',
        data() {
            return {

            }
        },
        methods: {
            getTemplates() {
                API.getTemplates()
            },
            createPermission() {
                API.createPermission()
            }
        },
        mounted() {
            this.getTemplates()
        }
    }
</script>
