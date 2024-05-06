export interface CurrentLeadType {
  _id: string;
  service: [];
  processes:{
      _id: string;
      stage_name: string;
      process_status: string;
      visibility: boolean;
      actions: Actions[];
      permissions: [];
      documents_required: [];
      createdAt: string;
      updatedAt: string;
    } [];
  is_unsuccessfull: boolean;
  status: string;
  booking_object: [];
  proposal_log_object: [];
  is_deleted: boolean;
  lead_source: string;
  lead_type: string;
  customer_id: string;
  customer_type: string;
  message: string;
  lead_id: string;
  user_id: string;
  lead_timeline: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
  created_by: string;
  customers: {
    _id: string;
    customer_type: string;
    isMember: boolean;
    status: string;
    is_deleted: boolean;
    first_name: string;
    phone_number: string;
    email: string;
    message: string;
    password: string;
    customer_details: {
      handicap: string;
      golf_club: string;
      website: string;
      city: string;
      address: string;
    };
    role_id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    additional_details: object;
    last_name: string;
    profile_image: string;
    updated_by: string;
  };
}
interface Actions {
  action_type: string;
  message: string;
  button: string;
  reject_button: string;
  status: string;
  preview: string;
  createdAt: string;
  updatedAt: string;
}
