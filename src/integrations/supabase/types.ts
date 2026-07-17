export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      before_after: {
        Row: {
          after_image: string
          after_alt: string | null
          before_image: string
          before_alt: string | null
          content_status: Database["public"]["Enums"]["content_status"]
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          language: string
          patient_consent_confirmed: boolean
          published: boolean
          slug: string | null
          sort_order: number | null
          title: string | null
          tags: string[]
          treatment_id: string | null
          updated_at: string
        }
        Insert: {
          after_image: string
          after_alt?: string | null
          before_image: string
          before_alt?: string | null
          content_status?: Database["public"]["Enums"]["content_status"]
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          language?: string
          patient_consent_confirmed?: boolean
          published?: boolean
          slug?: string | null
          sort_order?: number | null
          title?: string | null
          tags?: string[]
          treatment_id?: string | null
          updated_at?: string
        }
        Update: {
          after_image?: string
          after_alt?: string | null
          before_image?: string
          before_alt?: string | null
          content_status?: Database["public"]["Enums"]["content_status"]
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          language?: string
          patient_consent_confirmed?: boolean
          published?: boolean
          slug?: string | null
          sort_order?: number | null
          title?: string | null
          tags?: string[]
          treatment_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "before_after_treatment_id_fkey"
            columns: ["treatment_id"]
            isOneToOne: false
            referencedRelation: "treatments"
            referencedColumns: ["id"]
          },
        ]
      }
      before_after_translations: {
        Row: {
          case_id: string
          description: string | null
          id: string
          lang: string
          title: string | null
        }
        Insert: {
          case_id: string
          description?: string | null
          id?: string
          lang: string
          title?: string | null
        }
        Update: {
          case_id?: string
          description?: string | null
          id?: string
          lang?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "before_after_translations_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "before_after"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_translations: {
        Row: {
          bio: string | null
          credentials: string | null
          doctor_id: string
          id: string
          lang: string
          name: string
          title: string | null
        }
        Insert: {
          bio?: string | null
          credentials?: string | null
          doctor_id: string
          id?: string
          lang: string
          name: string
          title?: string | null
        }
        Update: {
          bio?: string | null
          credentials?: string | null
          doctor_id?: string
          id?: string
          lang?: string
          name?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doctor_translations_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          active: boolean
          bio: string | null
          content_status: Database["public"]["Enums"]["content_status"]
          created_at: string
          created_by: string | null
          deleted_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          photo: string | null
          slug: string
          sort_order: number | null
          specialties: string[] | null
          title: string | null
          updated_at: string
          updated_by: string | null
          user_id: string | null
          whatsapp: string | null
        }
        Insert: {
          active?: boolean
          bio?: string | null
          content_status?: Database["public"]["Enums"]["content_status"]
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          photo?: string | null
          slug: string
          sort_order?: number | null
          specialties?: string[] | null
          title?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id?: string | null
          whatsapp?: string | null
        }
        Update: {
          active?: boolean
          bio?: string | null
          content_status?: Database["public"]["Enums"]["content_status"]
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          photo?: string | null
          slug?: string
          sort_order?: number | null
          specialties?: string[] | null
          title?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          content_status: Database["public"]["Enums"]["content_status"]
          created_at: string
          deleted_at: string | null
          id: string
          language: string
          question: string
          scope: string
          scope_ref: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer: string
          content_status?: Database["public"]["Enums"]["content_status"]
          created_at?: string
          deleted_at?: string | null
          id?: string
          language?: string
          question: string
          scope?: string
          scope_ref?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer?: string
          content_status?: Database["public"]["Enums"]["content_status"]
          created_at?: string
          deleted_at?: string | null
          id?: string
          language?: string
          question?: string
          scope?: string
          scope_ref?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      lead_notes: {
        Row: {
          author_id: string | null
          body: string
          created_at: string
          id: string
          lead_id: string
        }
        Insert: {
          author_id?: string | null
          body: string
          created_at?: string
          id?: string
          lead_id: string
        }
        Update: {
          author_id?: string | null
          body?: string
          created_at?: string
          id?: string
          lead_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_notes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_status_history: {
        Row: {
          changed_at: string
          changed_by: string | null
          from_status: string | null
          id: string
          lead_id: string
          to_status: string
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          from_status?: string | null
          id?: string
          lead_id: string
          to_status: string
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          from_status?: string | null
          id?: string
          lead_id?: string
          to_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_status_history_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          email: string | null
          id: string
          lang: string | null
          message: string | null
          name: string | null
          notes: string | null
          phone: string | null
          source: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          lang?: string | null
          message?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          source?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          lang?: string | null
          message?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          source?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          alt: string | null
          created_at: string
          folder: string | null
          id: string
          mime_type: string | null
          path: string
          size_bytes: number | null
          uploaded_by: string | null
          url: string
        }
        Insert: {
          alt?: string | null
          created_at?: string
          folder?: string | null
          id?: string
          mime_type?: string | null
          path: string
          size_bytes?: number | null
          uploaded_by?: string | null
          url: string
        }
        Update: {
          alt?: string | null
          created_at?: string
          folder?: string | null
          id?: string
          mime_type?: string | null
          path?: string
          size_bytes?: number | null
          uploaded_by?: string | null
          url?: string
        }
        Relationships: []
      }
      post_translations: {
        Row: {
          body: string | null
          excerpt: string | null
          focus_keyword: string | null
          id: string
          lang: string
          meta_description: string | null
          meta_title: string | null
          og_image: string | null
          post_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          source_updated_at: string | null
          title: string
          translated_at: string | null
          translation_model: string | null
          translation_status: string
        }
        Insert: {
          body?: string | null
          excerpt?: string | null
          focus_keyword?: string | null
          id?: string
          lang: string
          meta_description?: string | null
          meta_title?: string | null
          og_image?: string | null
          post_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_updated_at?: string | null
          title: string
          translated_at?: string | null
          translation_model?: string | null
          translation_status?: string
        }
        Update: {
          body?: string | null
          excerpt?: string | null
          focus_keyword?: string | null
          id?: string
          lang?: string
          meta_description?: string | null
          meta_title?: string | null
          og_image?: string | null
          post_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_updated_at?: string | null
          title?: string
          translated_at?: string | null
          translation_model?: string | null
          translation_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_translations_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          category: string | null
          content: string | null
          content_status: Database["public"]["Enums"]["content_status"]
          cover_image: string | null
          created_at: string
          created_by: string | null
          deleted_at: string | null
          excerpt: string | null
          featured_image: string | null
          focus_keyword: string | null
          id: string
          keywords: string[] | null
          language: string
          published: boolean
          published_at: string | null
          scheduled_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          content_status?: Database["public"]["Enums"]["content_status"]
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          focus_keyword?: string | null
          id?: string
          keywords?: string[] | null
          language?: string
          published?: boolean
          published_at?: string | null
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          content_status?: Database["public"]["Enums"]["content_status"]
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          focus_keyword?: string | null
          id?: string
          keywords?: string[] | null
          language?: string
          published?: boolean
          published_at?: string | null
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      redirects: {
        Row: {
          created_at: string
          from_path: string
          id: string
          status_code: number
          to_path: string
        }
        Insert: {
          created_at?: string
          from_path: string
          id?: string
          status_code?: number
          to_path: string
        }
        Update: {
          created_at?: string
          from_path?: string
          id?: string
          status_code?: number
          to_path?: string
        }
        Relationships: []
      }
      research_publications: {
        Row: {
          abstract: string | null
          authors: string[] | null
          content: string | null
          content_status: Database["public"]["Enums"]["content_status"]
          cover_image: string | null
          created_at: string
          deleted_at: string | null
          doi: string | null
          external_url: string | null
          id: string
          issue: string | null
          journal: string | null
          keywords: string[] | null
          language: string
          pages: string | null
          pdf_url: string | null
          pub_type: string
          scheduled_at: string | null
          sci_indexed: boolean
          slug: string
          sort_order: number
          title: string
          updated_at: string
          volume: string | null
          year: number | null
        }
        Insert: {
          abstract?: string | null
          authors?: string[] | null
          content?: string | null
          content_status?: Database["public"]["Enums"]["content_status"]
          cover_image?: string | null
          created_at?: string
          deleted_at?: string | null
          doi?: string | null
          external_url?: string | null
          id?: string
          issue?: string | null
          journal?: string | null
          keywords?: string[] | null
          language?: string
          pages?: string | null
          pdf_url?: string | null
          pub_type?: string
          scheduled_at?: string | null
          sci_indexed?: boolean
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
          volume?: string | null
          year?: number | null
        }
        Update: {
          abstract?: string | null
          authors?: string[] | null
          content?: string | null
          content_status?: Database["public"]["Enums"]["content_status"]
          cover_image?: string | null
          created_at?: string
          deleted_at?: string | null
          doi?: string | null
          external_url?: string | null
          id?: string
          issue?: string | null
          journal?: string | null
          keywords?: string[] | null
          language?: string
          pages?: string | null
          pdf_url?: string | null
          pub_type?: string
          scheduled_at?: string | null
          sci_indexed?: boolean
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
          volume?: string | null
          year?: number | null
        }
        Relationships: []
      }
      review_translations: {
        Row: {
          content: string
          id: string
          lang: string
          review_id: string
        }
        Insert: {
          content: string
          id?: string
          lang: string
          review_id: string
        }
        Update: {
          content?: string
          id?: string
          lang?: string
          review_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_translations_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          content: string
          content_status: Database["public"]["Enums"]["content_status"]
          country: string | null
          country_flag: string | null
          created_at: string
          deleted_at: string | null
          featured: boolean
          id: string
          language: string
          patient_name: string
          rating: number
          review_date: string | null
          sort_order: number
          source: string | null
          source_url: string | null
          updated_at: string
        }
        Insert: {
          content: string
          content_status?: Database["public"]["Enums"]["content_status"]
          country?: string | null
          country_flag?: string | null
          created_at?: string
          deleted_at?: string | null
          featured?: boolean
          id?: string
          language?: string
          patient_name: string
          rating?: number
          review_date?: string | null
          sort_order?: number
          source?: string | null
          source_url?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          content_status?: Database["public"]["Enums"]["content_status"]
          country?: string | null
          country_flag?: string | null
          created_at?: string
          deleted_at?: string | null
          featured?: boolean
          id?: string
          language?: string
          patient_name?: string
          rating?: number
          review_date?: string | null
          sort_order?: number
          source?: string | null
          source_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      site_pages: {
        Row: {
          body: Json
          content_status: Database["public"]["Enums"]["content_status"]
          created_at: string
          created_by: string | null
          deleted_at: string | null
          eyebrow: string | null
          focus_keyword: string | null
          hero_description: string | null
          hero_image: string | null
          hero_title: string | null
          id: string
          language: string
          og_image: string | null
          page_type: string
          scheduled_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          body?: Json
          content_status?: Database["public"]["Enums"]["content_status"]
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          eyebrow?: string | null
          focus_keyword?: string | null
          hero_description?: string | null
          hero_image?: string | null
          hero_title?: string | null
          id?: string
          language?: string
          og_image?: string | null
          page_type?: string
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          body?: Json
          content_status?: Database["public"]["Enums"]["content_status"]
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          eyebrow?: string | null
          focus_keyword?: string | null
          hero_description?: string | null
          hero_image?: string | null
          hero_title?: string | null
          id?: string
          language?: string
          og_image?: string | null
          page_type?: string
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      treatment_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      treatment_translations: {
        Row: {
          body: string | null
          focus_keyword: string | null
          id: string
          lang: string
          meta_description: string | null
          meta_title: string | null
          name: string
          short_desc: string | null
          treatment_id: string
        }
        Insert: {
          body?: string | null
          focus_keyword?: string | null
          id?: string
          lang: string
          meta_description?: string | null
          meta_title?: string | null
          name: string
          short_desc?: string | null
          treatment_id: string
        }
        Update: {
          body?: string | null
          focus_keyword?: string | null
          id?: string
          lang?: string
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          short_desc?: string | null
          treatment_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "treatment_translations_treatment_id_fkey"
            columns: ["treatment_id"]
            isOneToOne: false
            referencedRelation: "treatments"
            referencedColumns: ["id"]
          },
        ]
      }
      treatments: {
        Row: {
          active: boolean
          benefits: string[]
          category: string | null
          category_slug: string | null
          content: string | null
          content_status: Database["public"]["Enums"]["content_status"]
          created_at: string
          created_by: string | null
          currency: string | null
          default_price: number | null
          deleted_at: string | null
          description: string | null
          expected_results: string[]
          featured_image: string | null
          focus_keyword: string | null
          icon: string | null
          id: string
          language: string
          og_image: string | null
          process_steps: string[]
          scheduled_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number | null
          suitable_for: string[]
          tags: string[]
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          active?: boolean
          benefits?: string[]
          category?: string | null
          category_slug?: string | null
          content?: string | null
          content_status?: Database["public"]["Enums"]["content_status"]
          created_at?: string
          created_by?: string | null
          currency?: string | null
          default_price?: number | null
          deleted_at?: string | null
          description?: string | null
          expected_results?: string[]
          featured_image?: string | null
          focus_keyword?: string | null
          icon?: string | null
          id?: string
          language?: string
          og_image?: string | null
          process_steps?: string[]
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number | null
          suitable_for?: string[]
          tags?: string[]
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          active?: boolean
          benefits?: string[]
          category?: string | null
          category_slug?: string | null
          content?: string | null
          content_status?: Database["public"]["Enums"]["content_status"]
          created_at?: string
          created_by?: string | null
          currency?: string | null
          default_price?: number | null
          deleted_at?: string | null
          description?: string | null
          expected_results?: string[]
          featured_image?: string | null
          focus_keyword?: string | null
          icon?: string | null
          id?: string
          language?: string
          og_image?: string | null
          process_steps?: string[]
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number | null
          suitable_for?: string[]
          tags?: string[]
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      xray_requests: {
        Row: {
          annotated_image_url: string | null
          annotations: Json | null
          assigned_at: string | null
          created_at: string
          currency: string | null
          delivery_channel: string | null
          delivery_error: string | null
          delivery_status: string
          doctor_id: string | null
          doctor_notes: string | null
          email: string | null
          id: string
          lang: string | null
          message: string | null
          opened_at: string | null
          patient_name: string
          patient_consent_at: string | null
          patient_viewed_at: string | null
          phone: string
          plan_expires_at: string | null
          plan_version: number
          price_total: number | null
          ready_at: string | null
          responded_at: string | null
          sent_at: string | null
          share_token: string
          status: string
          updated_at: string
          xray_image_url: string
        }
        Insert: {
          annotated_image_url?: string | null
          annotations?: Json | null
          assigned_at?: string | null
          created_at?: string
          currency?: string | null
          delivery_channel?: string | null
          delivery_error?: string | null
          delivery_status?: string
          doctor_id?: string | null
          doctor_notes?: string | null
          email?: string | null
          id?: string
          lang?: string | null
          message?: string | null
          opened_at?: string | null
          patient_name: string
          patient_consent_at?: string | null
          patient_viewed_at?: string | null
          phone: string
          plan_expires_at?: string | null
          plan_version?: number
          price_total?: number | null
          ready_at?: string | null
          responded_at?: string | null
          sent_at?: string | null
          share_token?: string
          status?: string
          updated_at?: string
          xray_image_url: string
        }
        Update: {
          annotated_image_url?: string | null
          annotations?: Json | null
          assigned_at?: string | null
          created_at?: string
          currency?: string | null
          delivery_channel?: string | null
          delivery_error?: string | null
          delivery_status?: string
          doctor_id?: string | null
          doctor_notes?: string | null
          email?: string | null
          id?: string
          lang?: string | null
          message?: string | null
          opened_at?: string | null
          patient_name?: string
          patient_consent_at?: string | null
          patient_viewed_at?: string | null
          phone?: string
          plan_expires_at?: string | null
          plan_version?: number
          price_total?: number | null
          ready_at?: string | null
          responded_at?: string | null
          sent_at?: string | null
          share_token?: string
          status?: string
          updated_at?: string
          xray_image_url?: string
        }
        Relationships: []
      }
      xray_plan_events: {
        Row: {
          actor_id: string | null
          created_at: string
          event_type: string
          id: string
          metadata: Json
          request_id: string
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          metadata?: Json
          request_id: string
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          metadata?: Json
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "xray_plan_events_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "xray_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      xray_treatment_items: {
        Row: {
          created_at: string
          id: string
          note: string | null
          price: number
          request_id: string
          sort_order: number | null
          tooth_number: string | null
          treatment_key: string
        }
        Insert: {
          created_at?: string
          id?: string
          note?: string | null
          price?: number
          request_id: string
          sort_order?: number | null
          tooth_number?: string | null
          treatment_key: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string | null
          price?: number
          request_id?: string
          sort_order?: number | null
          tooth_number?: string | null
          treatment_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "xray_treatment_items_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "xray_requests"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      archive_xray_request: { Args: { _request_id: string }; Returns: undefined }
      claim_xray_request: {
        Args: { _request_id: string }
        Returns: Database["public"]["Tables"]["xray_requests"]["Row"]
      }
      get_xray_plan: { Args: { _token: string }; Returns: Json }
      has_any_role: {
        Args: {
          _roles: Database["public"]["Enums"]["app_role"][]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      respond_xray_plan: {
        Args: { _accept: boolean; _token: string }
        Returns: string
      }
      save_xray_plan: {
        Args: {
          _annotated_image_url: string
          _annotations: Json
          _currency: string
          _doctor_notes: string
          _items: Json
          _mark_ready?: boolean
          _request_id: string
        }
        Returns: Database["public"]["Tables"]["xray_requests"]["Row"]
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "doctor"
        | "super_admin"
        | "editor"
        | "translator"
        | "lead_manager"
        | "viewer"
      content_status:
        | "draft"
        | "in_review"
        | "scheduled"
        | "published"
        | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "doctor",
        "super_admin",
        "editor",
        "translator",
        "lead_manager",
        "viewer",
      ],
      content_status: [
        "draft",
        "in_review",
        "scheduled",
        "published",
        "archived",
      ],
    },
  },
} as const
