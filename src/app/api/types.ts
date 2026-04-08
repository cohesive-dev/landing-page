export interface CohesiveCampaignMessageAttachment {
  url: string;
  filename: string;
  contentType: string;
}

export type CampaignOverviewSortBy = string;

export interface InboxAllParams {
  offset?: string;
  sortBy?: CampaignOverviewSortBy;
  search?: string;
}

export interface InboxRepliesParams {
  offset?: string;
  sortBy?: CampaignOverviewSortBy;
  search?: string;
  isInterested?: string;
}

export interface ReplyBody {
  senderEmail: string;
  replyEmailBody: string;
  originalEmailStatsId: string;
  originalEmailMessageId: string;
  originalEmailTime: string;
  originalEmailBody: string;
  cc: string | null;
  bcc: string | null;
  leadEmail: string;
  messageId: string;
  attachments: CohesiveCampaignMessageAttachment[];
}

export interface CohesiveCampaignMessage {
  type: string;
  id: string;
  time: string;
  from: string;
  to: string;
  emailBody: string;
  subject: string;
  emailSequenceNumber: string | null;
  openCount: number | null;
  clickCount: number | null;
  campaignId: string;
  statsId: string;
  cc: string[];
  bcc: string[];
  attachments: CohesiveCampaignMessageAttachment[];
}

export interface ConversationParams {
  leadEmail: string;
}

export type CampaignStatus = "DRAFTED" | "ACTIVE" | "COMPLETED" | "STOPPED" | "PAUSED" | "ARCHIVED";

export interface Campaign {
  id: string;
  createdAt: number;
  updatedAt: number;
  status: CampaignStatus;
  creationStatus: string;
  name: string;
}

export interface ForwardBody {
  senderEmail: string;
  leadEmail: string;
  statsId: string;
  cc: string | null;
  bcc: string | null;
  toEmails: string;
  messageId: string;
  attachments: CohesiveCampaignMessageAttachment[];
}
