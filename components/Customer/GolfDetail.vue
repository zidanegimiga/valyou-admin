<template lang="">
  <!-- data Table Rounds  -->
  <!-- drawer -->
  <CustomDrawer
    :title_report="'Fitting Report Jul 24, 2023'"
    :title_score="'EGC -CLUBHOUSE CLASSIC'"
    @close="closeDrawer"
    :show="show_scoreDrawer"
    :status="drawer_status"
    :drawerBtn="drawerBtn"
    :score_table="score_table"
    :subtitle="'Scoreboard'"
  />
  <div class="mb-6">
    <div class="grid flex align-items-center justify-content-between p-2">
      <span class="small__text custom_text font-bold custom_spacing"
        >ROUNDS</span
      >
    </div>

    <!-- panel data -->
    <Panel toggleable class="project_panel">
      <template v-slot:header>
        <span  class="pi pi-chevron-up panel_icon custom_text" ></span>
        <div
          class="custom-header flex align-items-center justify-content-between"
        >
          <span class="font-bold black_text">Game 23-07-2023</span>
          <div class="flex align-center">
            <span class="font-bold custom_text">3 players</span>
            <span
              :style="{ background: bgColor }"
              class="vertical_line mx-2 my-auto"
            ></span>
            <span class="font-bold custom_text">Full 18Holes</span>
          </div>
        </div>
      </template>
      <!-- panel details data -->
      <div class="col-12 flex align-center justify-content-between">
        <div class="flex flex-column">
          <span class="black_text font-medium small__text spacing_none"
            >Emirates Golf Club | Majlis</span
          >
          <span class="custom_text small__text spacing_none">23 Jun, 2023</span>
        </div>
        <div class="flex align-center gap-3">
          <span
            class="small__text spacing_none primary underline cursor-pointer"
            @click="handleViewScore('score')"
            >Scoreboard</span
          >
          <span
            class="small__text spacing_none primary underline cursor-pointer"
            @click="handleViewScore('report')"
            >Report</span
          >
        </div>
      </div>
      <!-- ScoreCard -->
      <div class="col-12">
        <CardBgCard :bgcolor="'#F9FAFC'">
          <template v-slot:score_card>
            <div class="col-12 md:col-3 flex gap-4">
              <CardWhiteCard :game_title="'Course Std Score'" :bgcolor="'#fff'"></CardWhiteCard>
              <CardWhiteCard :game_title="'Your Score'" :bgcolor="'#fff'"></CardWhiteCard>
            </div>
          </template>
          <template v-slot:score_des>
            <div
              class="col-12 md:col-5 lg:col-5 flex flex-column align-items-center gap-2"
            >
              <span
                class="text-center font-bold small__text spacing_none accent7"
                >{{ score_status }}</span
              >
              <span class="text-center custom_text small__text spacing_none">{{
                motivation_line
              }}</span>
            </div>
          </template>
        </CardBgCard>
      </div>
      <!-- stats -->
      <div class="col-12 flex align-center justify-content-between">
        <div class="flex flex-column">
          <span class="black_text font-bold small__text spacing_none"
            >Statistics</span
          >
        </div>
      </div>
      <!-- statistics score -->
      <div class="col-12 md:col-4 lg:col-4 flex align-items-center justify-content-between gap-2">
          <CardBgCard :bgcolor="'#F9FAFC'">
            <template v-slot:score_card>
              <span class="custom_text">Fairway Hits</span>
            </template>
            <template v-slot:score_des>
              <div class="flex align-items-center gap-3">
                <span class="font-bold spacing_none accent7 font-size-medium"
                  >{{ score }}%</span
                >
                <img
                  alt="svg"
                  src="/icons/p_green.svg"
                  class="pointer"
                  ripple
                />
              </div>
            </template>
          </CardBgCard>
          <CardBgCard :bgcolor="'#F9FAFC'">
            <template v-slot:score_card>
              <span class="custom_text">Green Hits (GIR)</span>
            </template>
            <template v-slot:score_des>
              <div class="flex align-items-center gap-3">
                <span class="font-bold spacing_none accent7 font-size-medium"
                  >{{ score }}%</span
                >
                <img
                  alt="svg"
                  src="/icons/p_danger.svg"
                  class="pointer"
                  ripple
                />
              </div>
            </template>
          </CardBgCard>
          <CardBgCard :bgcolor="'#F9FAFC'">
            <template v-slot:score_card>
              <span class="custom_text">Putting</span>
            </template>
            <template v-slot:score_des>
              <div class="flex align-items-center gap-3">
                <span class="font-bold spacing_none accent7 font-size-medium"
                  >{{ score_putting }}</span
                >
                <img
                  alt="svg"
                  src="/icons/p_danderUp.svg"
                  class="pointer"
                  ripple
                />
              </div>
            </template>
          </CardBgCard>
      </div>

      <!-- Players -->
      <div class="col-12 flex align-center justify-content-between">
        <div class="flex flex-column">
          <span class="black_text font-bold small__text spacing_none"
            >Players</span
          >
        </div>
      </div>
      <!-- Players score -->
      <div class="col-12">
        <CardPlayerScore :bgcolor="'#F9FAFC'"> </CardPlayerScore>
      </div>
      <div class="col-12">
        <CardPlayerScore :bgcolor="'#F9FAFC'"> </CardPlayerScore>
      </div>
    </Panel>
  </div>
</template>

<script>
export default {
  name: "CustomerGolfDetail",
  props: {
    image: {
      default: "https://randomuser.me/api/portraits/men/32.jpg",
      type: String,
    },
    title: {
      default: "Samsung Electronics",
      type: String,
    },
    subtitle: {
      default: "Corporate Section",
      type: String,
    },
    is_active: {
      default: false,
      type: Boolean,
    },
   
    golf_history: {
      default: "",
      type: Array,
    },
    golf_session: {
      default: "",
      type: Array,
    },
    drawerBtn: {
      default: "",
      type: Array,
    },
    score_table: {
      default: {},
      type: Object,
    },
    bgColor: {
      default: "#8D98A9",
      type: String,
    },
    score: {
      default: "70",
      type: String,
    },
    score_putting: {
      default: "20/29",
      type: String,
    },
    score_status: {
      default: "14% better than handicap",
      type: String,
    },
    motivation_line: {
      default:
        "Keep practising and refining your skills to improve your performance and reach new heights on the leaderboard",
      type: String,
    },
  },
  data() {
    return {
      show_scoreDrawer: false,
      drawer_status: "",
      panelVisible: false,
    }
  },
  methods: {
    // Tag Styled Color
    fetchStyle(value) {
      let task = value
      if (task === "Completed") {
        return "#1AD598"
      } else if (task === "On Track") {
        return "#FFBF5E"
      }
    },
    // handle sore drawer
    handleViewScore(value) {
      if (value == "report") {
        this.drawer_status = value
        this.show_scoreDrawer = true
      } else if (value == "score") {
        this.drawer_status = value
        this.show_scoreDrawer = true
      }
    },
    // close drawer
    closeDrawer() {
      this.show_scoreDrawer = false
    },
  },
}
</script>
<style lang="scss">
.right_sidebar {
  z-index: 111111 !important;
}
.logo_wrap {
  position: relative !important;
  .edt_btn {
    width: 2.2rem;
    height: 2.2rem;
    position: absolute !important;
    background-color: #fff !important;
    border-radius: 50% !important;
    box-shadow: 0.2px 0.2px 3px 0.2px;
    z-index: 11;
    bottom: -25px;
    left: 45px;
    cursor: pointer !important;
  }
}
.cc__chip {
  color: white;
  font-size: 0.6rem !important;
  padding: 2px 6px;
  border-radius: 0px;
  background-color: #1ad598 !important;
  position: relative;
  bottom: 0.4rem;
  border-radius: 4px;
  font-weight: 400;
}

.inactive__chip {
  color: white;
  font-size: 0.6rem !important;
  padding: 2px 6px;
  border-radius: 0px;
  background-color: #8d98a9 !important;
  position: relative;
  bottom: 0.4rem;
  border-radius: 4px;
  font-weight: 400;
}
.p-datatable-table tbody > tr > td {
  font-size: 0.8rem !important;
}
.round_table .p-datatable-table th {
  background-color: #fff !important;
  display: none !important;
}
.p-datatable-table th {
  font-weight: bold !important;
}
.side__bar {
  z-index: 111111111 !important;
}
.project_panel{
  position: relative !important;
  .panel_icon{
    position: absolute !important;
    right: 1.7rem;
    z-index: 10 !important;
    cursor: pointer;
  }
}
.project_panel.p-panel .p-panel-content {
  border: none !important;
  padding: 0.3rem !important;
}
.project_panel.p-panel .p-panel-header {
  border-radius: 8px !important;
  border: none !important;
  background-color: #ceeaff !important;
}
.custom-header {
  width: 100% !important;
}
.project_panel .p-icon{
  visibility: hidden !important;
}
</style>
