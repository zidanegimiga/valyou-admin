<template>
  <!-- min-h-screen max-h-screen h-screen -->
  <div class="wrapper-column min-h-screen max-h-screen h-screen ">
    <div class="wrapper-row h-full">
      <div class="item">
        <Sidebar />
      </div>
      <div class="item expand h-full min-h-screen w-full">
        <div class="wrapper-column  min-h-screen">
          <div class="item">
            <div
              class="topBar_wrap"
              style="padding-left: 17px !important; position: unset"
            >
              <div class="topBar">
                <ul class="nav_tab_menu flex gap-5">
                  <li
                    v-for="(item, index) in tabs"
                    :key="index"
                    class="p-tabmenuitem"
                    :class="{ 'p-highlight': getHighlights(item) }"
                  >
                    <NuxtLink :to="item.to" class="p-menuitem-link"
                      ><span class="p-menuitem-text">{{
                        item.label
                      }}</span></NuxtLink
                    >
                  </li>
                </ul>
                <div class="ml-auto">
                  
                  <KeepAlive>
                    <TopBar />
                  </KeepAlive>

                </div>
              </div>
            </div>
          </div>
          
          <!-- v-max-h-el-h -->
          <div  class="item expand main_body overflow-y-auto">
            <slot />
          </div>
        </div>
      </div>
      <Toast position="top-right" />
      
    </div>
    
  </div>

</template>

<!-- <script>
export default {
  directives: {
    'max-h-el-h': {
      beforeMount(el) {
        // Store the children in a variable
        el._children = Array.from(el.childNodes)
        // Clear the children before they are rendered
        while (el.firstChild) {
          el.firstChild.remove()
        }
      },
      mounted(el) {
        const clear_content = (el)=>{
          el.style.maxHeight = `unset`;

          // Store the children in a variable
          el._children = Array.from(el.childNodes)
          // Clear the children before they are rendered
          while (el.firstChild) {
            el.firstChild.remove()
          }

        }


        const updateMaxHeight = (el) => {
          const currentHeight = el.offsetHeight
          el.style.maxHeight = `${currentHeight}px`
          // Restore the children
          el._children.forEach(child => {
            el.appendChild(child)
          })
        }

        updateMaxHeight(el)



        window.addEventListener('resize', ()=>{
          console.log("resize is done");
          clear_content(el) 
          updateMaxHeight(el)
        });
      },
    },
  },
}

</script> -->

<!-- updated -->
<!-- <script>
export default {
  directives: {
    "max-h-el-h": {
      beforeMount(el) {
        // Store the children in a variable
        el._children = Array.from(el.childNodes)
        // Clear the children before they are rendered
        while (el.firstChild) {
          el.firstChild.remove()
        }
      },
      mounted(el) {
        const clear_content = (el) => {
          el.style.maxHeight = `unset`

          // Store the children in a variable
          el._children = Array.from(el.childNodes)
          // Clear the children before they are rendered
          while (el.firstChild) {
            el.firstChild.remove()
          }
        }

        const updateMaxHeight = (el) => {
          //
          if (el._children.length > 0 && el.offsetHeight > 0) {
            const currentHeight = el.offsetHeight
            el.style.maxHeight = `${currentHeight}px`
          }

          // console.log("currentHeight:",currentHeight);

          // Restore the children
          el._children.forEach((child) => {
            el.appendChild(child)
          })
        }

        // clear_content(el)
        updateMaxHeight(el)

        window.addEventListener("resize", () => {

          clear_content(el)
          updateMaxHeight(el)
        })
      },
    },
  },
}
</script> -->

<script setup>
import { ref } from "vue"
import { reactive, provide } from "vue"

import dynamic_tabs from "@/config/dynamic_tab"

const router = useRoute()

var page_name = router.path.split("/")[1]

const tabs = ref(dynamic_tabs[page_name])

// Method to force re-render
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
const forceRerender = async () => {
  await sleep(100)
  let router = useRoute()
  var page_name = router.path.split("/")[1]
  if (page_name == undefined) {
    page_name = ""
  }

  tabs.value = dynamic_tabs[page_name]
}
provide("forceRerender", forceRerender)

const getHighlights = (item) => {
  switch (router.path) {
    case item.to:
      return true
      break

    case item.to + "/":
      return true
      break

    case "/" + item.to:
      return true
      break

    default:
      return false
      break
  }
}
</script>

<style lang="scss">
// fit with design
.nav_tab_menu {
  .p-tabmenuitem:hover {
    border: unset;
  }
  // .p-menuitem-link {
  //   // display: inline-block;
  // }
  .p-highlight {
    .p-menuitem-link {
      border-bottom: 3px solid #0a94ff !important;
      color: #0a94ff !important;
    }
  }

  .p-tabmenu
    .p-tabmenu-nav
    .p-tabmenuitem:not(.p-highlight):not(.p-disabled):hover
    .p-menuitem-link {
    background: #fff;
    border-color: #0080ff;
    color: #000000;
  }
}

.topBar {
  .p-tabview-nav {
    background: transparent;
    border-color: transparent !important;
    .p-tabview-nav-link {
      background: transparent !important;
      border-color: transparent !important;
    }
  }

  .p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
    border-color: transparent;
  }

  .p-tabmenu
    .p-tabmenu-nav
    .p-tabmenuitem
    .p-menuitem-link:not(.p-disabled):focus {
    box-shadow: none !important;
  }
}

.nav_tab_menu {
  .p-tabview-nav-container {
    position: absolute;
    // bottom: 4.5rem;
    top: 0px;
    z-index: 2;
    .p-tabview-nav {
      background: transparent;
      border-color: transparent;
      .p-tabview-nav-link {
        background: transparent !important;
        border-color: transparent;
        font-weight: 500;
        span {
          letter-spacing: 0.01rem !important;
        }
      }
    }
  }
  .p-tabview-nav li.p-highlight .p-tabview-nav-link {
    border-bottom: 2px solid #3494ff;
  }
  .p-tabview-panels {
    position: relative;
    background: transparent;
    padding: 0px;
  }
  .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
    box-shadow: none;
  }
  ul {
    column-gap: 2rem !important;
    border: none !important;
    padding-bottom: 2px !important;
  }
  .p-tabmenuitem {
    display: flex;
    align-items: center;
    justify-content: center;
    .p-menuitem-link {
      border: none !important;
      padding: 0px !important;
      border-radius: 0px !important;
      .p-menuitem-text {
        font-size: 0.8rem !important;
        color: #8d98a9 !important;
        padding: 0.5rem !important;
      }
    }
    &.p-highlight {
      .p-menuitem-link {
        .p-menuitem-text {
          background: lighten($color: #3494ff, $amount: 35);
          color: #3494ff !important;
          border-radius: 5px !important;
        }
      }
    }
  }
}
.topBar {
  .p-tabview-nav {
    background: transparent;
    border-color: transparent !important;
    .p-tabview-nav-link {
      background: transparent !important;
      border-color: transparent !important;
    }
  }

  .p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
    border-color: transparent;
  }

  .p-tabmenu
    .p-tabmenu-nav
    .p-tabmenuitem
    .p-menuitem-link:not(.p-disabled):focus {
    box-shadow: none !important;
  }
}
</style>
