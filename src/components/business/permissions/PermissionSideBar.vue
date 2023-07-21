<template>
    <SideBar ref="sidebar">
        <div class="content">
            <div class="back">
                <a>
                    <ArrowLeft />
                    Назад
                </a>
            </div>
            <div class="title">
                Менеджер
            </div>
        </div>
    </SideBar>
</template>

<script>
import SideBar from '../../UI/popups/SideBar.vue';
import ArrowLeft from '../../UI/icons/ArrowLeft.vue';

export default {
    components: {
        SideBar,
        ArrowLeft,
    },
    methods: {
        open() {
            this.$refs.sidebar.open();
        },
    },
}
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: column;
    gap: 24px;

    border-top: 1px solid #DEE2E7;
    margin-top: 72px;

    padding: 24px;

    .title {
        border-radius: 3px;
        background: #F3F5F6;
        width: 296px;
        padding: 5px 16px;

        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 30px; /* 150% */
    }
}
</style>