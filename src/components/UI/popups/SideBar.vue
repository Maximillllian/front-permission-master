<template>
    <transition name="fade">
        <div v-show="shown" key="1" class="sidebar-outer">
            <transition name="slide" appear>
                <div v-show="shown" key="2" class="sidebar-inner" :class="[type]">
                    <slot></slot>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
// TODO:
// [] привести вызов модалок и sidebars к единому виду
// [] добавить закрытие по esc
// [] возможно сделать общий композабл с модалками
const stack = window.__side_bar_stack = [];

function last() {
    return stack[stack.length - 1];
}

function remove(item) {
    const index = stack.findIndex(it => it === item);
    if (index >= 0) {
        stack.splice(index, 1);
    }
}

function append(item) {
    stack.push(item);
}

export default {
    props: {
        type: {
            type: String,
            required: false,
            default: "medium",
        },
    },
    data() {
        return {
            opened: false,
            shown: false,
        }
    },
    methods: {
        open() {
            if (this.shown) {
                return;
            }

            const active = last();
            if (active) {
                active.__hide();
            }

            if (this.opened) {
                remove(this);
            }

            append(this);
            this.opened = true;

            this.__show();
        },
        close() {
            if (!this.opened) {
                return;
            }

            remove(this);
            this.opened = false;

            this.__hide();

            const active = last();
            if (active) {
                active.__show();
            }
        },
        __hide() {
            this.shown = false;
        },
        __show() {
            this.shown = true;
        },
    },
    mounted() {
        this.$el.parentNode?.removeChild(this.$el);
        document.body.appendChild(this.$el);
    },
}
</script>

<style lang="scss">
.sidebar-outer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #0E1117;
    z-index: 100;
    display: flex;
    flex-direction: row-reverse;

    .sidebar-inner {
        position: relative;
        background: white;
        display: flex;
        flex-direction: column;
        font-size:   14px;
        line-height: 20px;
        font-weight: normal;
        color:  rgb(16, 24, 40);

        &.medium {
            width: 1240px;
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all .2s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transition: all .15s ease-in 0s;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform .3s ease;
    transition-delay: .15s;
    transform: translateX(0);
}

.slide-enter,
.slide-leave-to {
    transition: transform .25s ease-in 0s;
    transform: translateX(100%);
}
</style>
