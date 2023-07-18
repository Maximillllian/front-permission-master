<template>
    <div class="modals-container">
        <template v-for="(modal, modalKey) in modals" :key="modalKey">
            <div class="modal-wrap">
                <div class="modal-overlay" :ref="setItemRef" @click="closeWrap($event, modalKey)"></div>
                <div class="modal-container" :style="setWidth(modal.width)">
                    <div class="modal-close" @click="close(modalKey)">

                    </div>
                    <component
                        ref="customComponent"
                        :is="modal.component"
                        :modalKey="modalKey"
                        v-bind="modal.componentProps"
                        :onClose="close"
                    />
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Modals",
        components: {},
        data() {
            return {
                itemRefs: []
            }
        },
        methods: {
            close(_modalKey) {
                if (this.$refs.customComponent[_modalKey]) {
                    this.$refs.customComponent[_modalKey].$destroy();
                }
                this.$store.dispatch('modalClose', _modalKey);
            },
            closeWrap(event, _modalKey) {
                //если кликнули по оверлею
                if (event.target === this.itemRefs[_modalKey]) {
                    this.close(_modalKey)
                }
            },
            keyUpHandler(event) {
                if ((['Escape', 'Esc'].includes(event.key)) && this.modals.length) {
                    this.close(this.modals.length - 1);
                }
            },
            setItemRef(el) {
                if (el) {
                    this.itemRefs.push(el)
                }
            },
            setWidth(width) {
                if (width && typeof width === "number") {
                    return `max-width: ${width}px`
                }
                return false
            }
        },
        watch: {
            modals: {
                deep: true,
                handler() {
                    const html = document.querySelector('html');

                    if (this.modals.length) {
                        html.classList.add('modals-open');
                        return;
                    }
                    html.classList.remove('modals-open')
                },
            }
        },
        computed: {
            ...mapGetters(['modals']),
        },
        beforeUpdate() {
            this.itemRefs = []
        },
        mounted() {
            document.addEventListener("keyup", this.keyUpHandler);
        },
        unmounted() {
            document.removeEventListener("keyup", this.keyUpHandler);
        }
    }
</script>

<style lang="scss">

    .modal-wrap {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        overflow: hidden;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20px;

        .modal-overlay {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 3;
            background: rgba(#000, .3);
            pointer-events: auto;
        }

        .modal-container {
            background: #FFFFFF;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            padding: 48px 60px;
            box-sizing: border-box;
            position: relative;
            z-index: 4;
            width: 100%;
            max-width: 620px;
            margin: 30px auto;
            pointer-events: auto;
        }

        .modal-close {
            position: absolute;
            right: 16px;
            top: 16px;
            cursor: pointer;

            svg {
                fill: #A8B4BE;
            }
        }
    }

    .modal-title {
        font-weight: bold;
        font-size: 24px;
        line-height: 32px;
        color: #162133;
        margin-bottom: 24px;

        &-sub {
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            color: #748797;
            margin-left: 20px;
        }
    }

    .modals-open {
        overflow: hidden !important;
    }
</style>
