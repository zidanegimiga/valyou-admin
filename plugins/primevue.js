import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import AutoComplete from "primevue/autocomplete";
import DatePicker from "primevue/calendar";
import CascadeSelect from "primevue/cascadeselect";
import Checkbox from "primevue/checkbox";
import Dropdown from "primevue/dropdown";
import Editor from "primevue/editor";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import Knob from "primevue/knob";
import MultiSelect from "primevue/multiselect";
import Password from "primevue/password";
import RadioButton from "primevue/radiobutton";
import Rating from "primevue/rating";
import SelectButton from "primevue/selectbutton";
import Slider from "primevue/slider";
import Textarea from "primevue/textarea";
import ToggleButton from "primevue/togglebutton";
import TreeSelect from "primevue/treeselect";
import TriStateCheckbox from "primevue/tristatecheckbox";
import SplitButton from "primevue/splitbutton";

//data
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import Paginator from "primevue/paginator";
import Timeline from "primevue/timeline";

//panels
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Card from "primevue/card";
import DeferredContent from "primevue/deferredcontent";
import Divider from "primevue/divider";
import ScrollPanel from "primevue/scrollpanel";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Toolbar from "primevue/toolbar";
import Panel from 'primevue/panel';

//dialog
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmPopup from "primevue/confirmpopup";
import ConfirmationService from "primevue/confirmationservice";
import Dialog from "primevue/dialog";
import DynamicDialog from "primevue/dynamicdialog";
import DialogService from 'primevue/dialogservice';
import OverlayPanel from "primevue/overlaypanel";
import Sidebar from "primevue/sidebar";
import Tooltip from "primevue/tooltip";
import FileUpload from "primevue/fileupload";
import Breadcrumb from "primevue/breadcrumb";
import Menu from "primevue/menu";
import Steps from "primevue/steps";
import TabMenu from "primevue/tabmenu";

//chart
import Chart from "primevue/chart";

//messages
import Message from "primevue/message";
import InlineMessage from "primevue/inlinemessage";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

//media
import Carousel from "primevue/carousel";
import Galleria from "primevue/galleria";
import Image from "primevue/image";

//misc
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
import Badge from "primevue/badge";
import BadgeDirective from "primevue/badgedirective";
import BlockUI from "primevue/blockui";
import Chip from "primevue/chip";
import FocusTrap from "primevue/focustrap";
import Inplace from "primevue/inplace";
import ScrollTop from "primevue/scrolltop";
import Skeleton from "primevue/skeleton";
import ProgressBar from "primevue/progressbar";
import ProgressSpinner from "primevue/progressspinner";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";
import Tag from "primevue/tag";
import Quill from 'quill' // fix for Editor Style TypeError Issue

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("AutoComplete", AutoComplete);
  nuxtApp.vueApp.component("DatePicker", DatePicker);
  nuxtApp.vueApp.component("CascadeSelect", CascadeSelect);
  nuxtApp.vueApp.component("Checkbox", Checkbox);
  nuxtApp.vueApp.component("Dropdown", Dropdown);
  nuxtApp.vueApp.component("Editor", Editor);
  nuxtApp.vueApp.component("InputMask", InputMask);
  nuxtApp.vueApp.component("InputNumber", InputNumber);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("InputSwitch", InputSwitch);
  nuxtApp.vueApp.component("Password", Password);
  nuxtApp.vueApp.component("RadioButton", RadioButton);
  nuxtApp.vueApp.component("Rating", Rating);
  nuxtApp.vueApp.component("Knob", Knob);
  nuxtApp.vueApp.component("MultiSelect", MultiSelect);
  nuxtApp.vueApp.component("SelectButton", SelectButton);
  nuxtApp.vueApp.component("Slider", Slider);
  nuxtApp.vueApp.component("Textarea", Textarea);
  nuxtApp.vueApp.component("ToggleButton", ToggleButton);
  nuxtApp.vueApp.component("TreeSelect", TreeSelect);
  nuxtApp.vueApp.component("TriStateCheckbox", TriStateCheckbox);
  nuxtApp.vueApp.component("SplitButton", SplitButton);
  nuxtApp.vueApp.component("DataTable", DataTable);
  nuxtApp.vueApp.component("Column", Column);
  nuxtApp.vueApp.component("ColumnGroup", ColumnGroup);
  nuxtApp.vueApp.component("Row", Row);
  nuxtApp.vueApp.component("Paginator", Paginator);
  nuxtApp.vueApp.component("Timeline", Timeline);
  nuxtApp.vueApp.component("Accordion", Accordion);
  nuxtApp.vueApp.component("AccordionTab", AccordionTab);
  nuxtApp.vueApp.component("Card", Card);
  nuxtApp.vueApp.component("DeferredContent", DeferredContent);
  nuxtApp.vueApp.component("Divider", Divider);
  nuxtApp.vueApp.component("ScrollPanel", ScrollPanel);
  nuxtApp.vueApp.component("TabView", TabView);
  nuxtApp.vueApp.component("TabPanel", TabPanel);
  nuxtApp.vueApp.component("Toolbar", Toolbar);
  nuxtApp.vueApp.component("Panel", Panel);
  nuxtApp.vueApp.component("ConfirmDialog", ConfirmDialog); //useConfirm() - refer doc
  nuxtApp.vueApp.use(ConfirmationService);
  nuxtApp.vueApp.component("ConfirmPopup", ConfirmPopup); // useconfirm() - refer doc
  nuxtApp.vueApp.component("Dialog", Dialog);
  nuxtApp.vueApp.component("DynamicDialog", DynamicDialog);
  nuxtApp.vueApp.use(DialogService);
  nuxtApp.vueApp.component("OverlayPanel", OverlayPanel);
  nuxtApp.vueApp.component("SidebarPrime", Sidebar);
  nuxtApp.vueApp.directive("tooltip", Tooltip);
  nuxtApp.vueApp.component("FileUpload", FileUpload);
  nuxtApp.vueApp.component("Breadcrumb", Breadcrumb);
  nuxtApp.vueApp.component("Menu", Menu);
  nuxtApp.vueApp.component("Steps", Steps);
  nuxtApp.vueApp.component("TabMenu", TabMenu);
  nuxtApp.vueApp.component("Chart", Chart);
  nuxtApp.vueApp.component("Message", Message);
  nuxtApp.vueApp.component("InlineMessage", InlineMessage);
  nuxtApp.vueApp.component("Toast", Toast); // useToast() - refer docs
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.component("Carousel", Carousel);
  nuxtApp.vueApp.component("Galleria", Galleria);
  nuxtApp.vueApp.component("Image", Image);
  nuxtApp.vueApp.component("Avatar", Avatar);
  nuxtApp.vueApp.component("AvatarGroup", AvatarGroup);
  nuxtApp.vueApp.component("Badge", Badge);
  nuxtApp.vueApp.directive("badge", BadgeDirective);
  nuxtApp.vueApp.component("BlockUI", BlockUI);
  nuxtApp.vueApp.component("Chip", Chip);
  nuxtApp.vueApp.directive("focustrap", FocusTrap);
  nuxtApp.vueApp.component("Inplace", Inplace);
  nuxtApp.vueApp.component("ScrollTop", ScrollTop);
  nuxtApp.vueApp.component("Skeleton", Skeleton);
  nuxtApp.vueApp.component("ProgressBar", ProgressBar);
  nuxtApp.vueApp.component("ProgressSpinner", ProgressSpinner);
  nuxtApp.vueApp.directive("ripple", Ripple);
  nuxtApp.vueApp.directive("styleclass", StyleClass);
  nuxtApp.vueApp.component("Tag", Tag);

  //other components that you need
});
