<template>
    <div class="container">
        <button @click="openPermissionsModal">Открыть модалку</button>
        <button @click="createPermission">create</button>
        <PermissionSideBar ref="sidebar" />
    </div>
</template>

<script>
import PermissionSideBar from "../components/business/permissions/PermissionSideBar.vue";
import API from "@/api/api";

export default {
    name: "Home",
    components: {
        PermissionSideBar,
    },
    data() {
        return {
            permissions: {},
        };
    },
    methods: {
        getTemplates() {
            return API.getTemplates();
        },
        createPermission() {
            API.createPermission();
        },
        openPermissionsModal() {
            this.$refs.sidebar.open();
        }
    },
    async mounted() {
        this.permissions = await this.getTemplates();
    },
}
</script>
