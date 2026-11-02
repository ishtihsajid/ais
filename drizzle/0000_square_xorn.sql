CREATE TYPE "public"."enum__locales" AS ENUM('en', 'bn');--> statement-breakpoint
CREATE TYPE "public"."enum_articles_kind" AS ENUM('guide', 'news', 'faq');--> statement-breakpoint
CREATE TYPE "public"."enum_enquiries_status" AS ENUM('new', 'contacted', 'resolved');--> statement-breakpoint
CREATE TYPE "public"."enum_enquiries_type" AS ENUM('tile', 'general', 'project', 'dealer');--> statement-breakpoint
CREATE TYPE "public"."enum_finishes_category" AS ENUM('floor', 'wall', 'both');--> statement-breakpoint
CREATE TYPE "public"."enum_initiatives_category" AS ENUM('learning', 'people', 'community', 'environment');--> statement-breakpoint
CREATE TYPE "public"."enum_journey_chapters_theme" AS ENUM('dark', 'light');--> statement-breakpoint
CREATE TYPE "public"."enum_media_category" AS ENUM('tile_texture', 'room_scene', 'catalog_pdf', 'brand_photo', 'fitter_guide', 'general');--> statement-breakpoint
CREATE TYPE "public"."enum_media_processing_status" AS ENUM('pending', 'processing', 'ready', 'error');--> statement-breakpoint
CREATE TYPE "public"."enum_media_rotation" AS ENUM('0', '90', '180', '270');--> statement-breakpoint
CREATE TYPE "public"."enum_pages_blocks_tile_grid_showcase_filter_category" AS ENUM('all', 'floor', 'wall', 'featured');--> statement-breakpoint
CREATE TYPE "public"."enum_pages_status" AS ENUM('published', 'draft', 'archived');--> statement-breakpoint
CREATE TYPE "public"."enum_products_category" AS ENUM('floor', 'wall');--> statement-breakpoint
CREATE TYPE "public"."enum_products_colour_family" AS ENUM('white', 'beige', 'grey', 'black', 'brown', 'blue', 'green', 'terracotta', 'multicolor');--> statement-breakpoint
CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."enum_products_wall_or_floor" AS ENUM('floor', 'wall');--> statement-breakpoint
CREATE TYPE "public"."enum_showrooms_tier" AS ENUM('flagship', 'exclusive', 'dealer');--> statement-breakpoint
CREATE TYPE "public"."enum_sizes_category" AS ENUM('floor', 'wall');--> statement-breakpoint
CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');--> statement-breakpoint
CREATE TYPE "public"."enum_voices_role" AS ENUM('fitter', 'dealer', 'designer', 'customer', 'plant team');--> statement-breakpoint
CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"kind" "enum_articles_kind" NOT NULL,
	"cover_id" integer,
	"date" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "articles_locales" (
	"title" varchar NOT NULL,
	"summary" varchar,
	"body" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "catalogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"series_id" integer,
	"pdf_id" integer,
	"cover_image_id" integer,
	"pages" numeric,
	"filesize_mb" numeric,
	"date" varchar,
	"is_hidden" boolean DEFAULT false,
	"download_count" numeric DEFAULT 0,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "catalogs_locales" (
	"title" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "claims" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar NOT NULL,
	"en_text" varchar NOT NULL,
	"bn_text" varchar,
	"as_of_date" varchar,
	"internal_source_note" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "enum_enquiries_type" NOT NULL,
	"name" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"email" varchar,
	"message" varchar,
	"shortlist" jsonb,
	"nearest_showroom" varchar,
	"status" "enum_enquiries_status" DEFAULT 'new',
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finishes" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"category" "enum_finishes_category" NOT NULL,
	"hero_image_id" integer,
	"order" numeric DEFAULT 0,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finishes_locales" (
	"name" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "initiatives" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"year" varchar,
	"category" "enum_initiatives_category" NOT NULL,
	"cover_image_id" integer,
	"video_id" integer,
	"link" varchar,
	"sample" boolean DEFAULT false,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "initiatives_locales" (
	"title" varchar NOT NULL,
	"summary" varchar,
	"story" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "initiatives_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);
--> statement-breakpoint
CREATE TABLE "interiors" (
	"id" serial PRIMARY KEY NOT NULL,
	"space_id" integer NOT NULL,
	"image_id" integer NOT NULL,
	"alt_text" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interiors_hotspots" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"x" numeric NOT NULL,
	"y" numeric NOT NULL,
	"product_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interiors_hotspots_locales" (
	"label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interiors_locales" (
	"caption" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journey" (
	"id" serial PRIMARY KEY NOT NULL,
	"prelude_skippabble" boolean DEFAULT true,
	"car_equivalent_kg" numeric DEFAULT 1330,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "journey_chapters" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"pin_length_vh" numeric NOT NULL,
	"theme" "enum_journey_chapters_theme" DEFAULT 'dark',
	"desktop_video_id" integer,
	"mobile_video_id" integer,
	"poster_id" integer
);
--> statement-breakpoint
CREATE TABLE "journey_chapters_locales" (
	"title" varchar NOT NULL,
	"kicker" varchar,
	"body" varchar,
	"closing_line" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journey_slim_variants" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"variant" varchar NOT NULL,
	"label" varchar NOT NULL,
	"conventional_kg_per_sqm" numeric NOT NULL,
	"slim_kg_per_sqm" numeric NOT NULL,
	"reduction_pct" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "legacy_page_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "legacy_page_settings_locales" (
	"about_title" varchar,
	"about_subtitle" varchar,
	"about_content" varchar,
	"sustainability_title" varchar,
	"sustainability_subtitle" varchar,
	"sustainability_content" varchar,
	"quality_and_technology_title" varchar,
	"quality_and_technology_subtitle" varchar,
	"quality_and_technology_content" varchar,
	"slim_tiles_title" varchar,
	"slim_tiles_subtitle" varchar,
	"slim_tiles_content" varchar,
	"heatproof_tiles_title" varchar,
	"heatproof_tiles_subtitle" varchar,
	"heatproof_tiles_content" varchar,
	"fitters_title" varchar,
	"fitters_subtitle" varchar,
	"fitters_content" varchar,
	"professionals_title" varchar,
	"professionals_subtitle" varchar,
	"professionals_content" varchar,
	"contact_title" varchar,
	"contact_subtitle" varchar,
	"contact_content" varchar,
	"privacy_title" varchar,
	"privacy_content" varchar,
	"terms_title" varchar,
	"terms_content" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "legacy_page_settings_sustainability_pillars" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"number" varchar
);
--> statement-breakpoint
CREATE TABLE "legacy_page_settings_sustainability_pillars_locales" (
	"title" varchar,
	"detail" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"decorative" boolean DEFAULT false,
	"category" "enum_media_category" DEFAULT 'tile_texture',
	"rotation" "enum_media_rotation" DEFAULT '0',
	"is_hidden" boolean DEFAULT false,
	"downloadable" boolean DEFAULT false,
	"download_count" numeric DEFAULT 0,
	"processing_status" "enum_media_processing_status" DEFAULT 'ready',
	"generated_sizes" jsonb,
	"zoom_tiles_path" varchar,
	"video_variants" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric
);
--> statement-breakpoint
CREATE TABLE "navigation" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "navigation_footer_groups" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "navigation_footer_groups_links" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"href" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "navigation_footer_groups_links_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "navigation_footer_groups_locales" (
	"title" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "navigation_header_nav" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"href" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "navigation_header_nav_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"status" "enum_pages_status" DEFAULT 'published',
	"meta_og_image_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages_blocks_download_center" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"is_hidden" boolean DEFAULT false,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "pages_blocks_download_center_locales" (
	"heading" varchar DEFAULT 'Official Catalogues & Brochures',
	"subheading" varchar DEFAULT 'Download technical specification sheets and master product catalogs.',
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages_blocks_hero_scene" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"primary_cta_link" varchar,
	"secondary_cta_link" varchar,
	"background_image_id" integer,
	"is_hidden" boolean DEFAULT false,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "pages_blocks_hero_scene_locales" (
	"badge" varchar DEFAULT 'FRESH CERAMICS',
	"headline" varchar NOT NULL,
	"subtext" varchar,
	"primary_cta_text" varchar,
	"secondary_cta_text" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages_blocks_rich_text_section" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"media_id" integer,
	"is_hidden" boolean DEFAULT false,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "pages_blocks_rich_text_section_locales" (
	"heading" varchar,
	"body" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages_blocks_showroom_network" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"is_hidden" boolean DEFAULT false,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "pages_blocks_showroom_network_locales" (
	"heading" varchar DEFAULT 'Find a Showroom Near You',
	"subheading" varchar DEFAULT 'Over 81 exclusive showrooms and authorised dealers across Bangladesh.',
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages_blocks_stats_banner" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"metric1_value" varchar DEFAULT 'Since 2021',
	"metric1_label" varchar DEFAULT 'TILE PLANT ESTABLISHED',
	"metric2_value" varchar DEFAULT '18.6M sq m a year',
	"metric2_label" varchar DEFAULT 'ANNUAL PRODUCTION CAPACITY',
	"metric3_value" varchar DEFAULT 'Market Sales Leadership',
	"metric3_label" varchar DEFAULT 'Highest selling tiles brand in Bangladesh',
	"is_hidden" boolean DEFAULT false,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "pages_blocks_story_chapter" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"chapter_number" varchar DEFAULT '01',
	"image_id" integer,
	"is_hidden" boolean DEFAULT false,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "pages_blocks_story_chapter_locales" (
	"title" varchar,
	"content" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages_blocks_tile_grid_showcase" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"filter_category" "enum_pages_blocks_tile_grid_showcase_filter_category" DEFAULT 'all',
	"limit" numeric DEFAULT 12,
	"is_hidden" boolean DEFAULT false,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "pages_blocks_tile_grid_showcase_locales" (
	"heading" varchar,
	"subheading" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages_locales" (
	"title" varchar NOT NULL,
	"meta_meta_title" varchar,
	"meta_meta_description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_kv" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar NOT NULL,
	"data" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_locked_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"global_slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_locked_documents_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer,
	"products_id" integer,
	"finishes_id" integer,
	"sizes_id" integer,
	"series_id" integer,
	"spaces_id" integer,
	"interiors_id" integer,
	"catalogs_id" integer,
	"showrooms_id" integer,
	"initiatives_id" integer,
	"voices_id" integer,
	"articles_id" integer,
	"claims_id" integer,
	"enquiries_id" integer,
	"media_id" integer,
	"users_id" integer
);
--> statement-breakpoint
CREATE TABLE "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"category" "enum_products_category" NOT NULL,
	"finish_id" integer NOT NULL,
	"size_id" integer NOT NULL,
	"series_id" integer,
	"colour_family" "enum_products_colour_family",
	"zoomable" boolean DEFAULT true,
	"pcs_per_carton" numeric,
	"sqm_per_carton" numeric,
	"carton_kg" numeric,
	"slim" boolean DEFAULT false,
	"heatproof" boolean DEFAULT false,
	"wall_or_floor" "enum_products_wall_or_floor",
	"width_cm" numeric,
	"height_cm" numeric,
	"tileable_texture_id" integer,
	"grout_width_mm" numeric DEFAULT 2,
	"status" "enum_products_status" DEFAULT 'published',
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products_locales" (
	"name" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"spaces_id" integer,
	"media_id" integer
);
--> statement-breakpoint
CREATE TABLE "series" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"hero_image_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "series_locales" (
	"name" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "showrooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"tier" "enum_showrooms_tier" NOT NULL,
	"division" varchar NOT NULL,
	"district" varchar NOT NULL,
	"thana" varchar,
	"phone" varchar,
	"hours" varchar,
	"latitude" numeric,
	"longitude" numeric,
	"map_link" varchar,
	"photo_id" integer,
	"opened_date" varchar,
	"placeholder" boolean DEFAULT false,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "showrooms_locales" (
	"name" varchar NOT NULL,
	"address" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"hotline" varchar DEFAULT '16595' NOT NULL,
	"email" varchar DEFAULT 'info@freshceramics.net' NOT NULL,
	"waste_allowance_pct" numeric DEFAULT 10,
	"car_equivalent_kg" numeric DEFAULT 1330,
	"feature_visualizer" boolean DEFAULT false,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "site_settings_locales" (
	"factory_location" varchar DEFAULT 'Meghnaghat, Sonargaon, Narayanganj, Bangladesh' NOT NULL,
	"head_office" varchar DEFAULT 'Fresh Villa, House 12, Road 11, Block G, Banani, Dhaka, Bangladesh' NOT NULL,
	"legal_entity_line" varchar DEFAULT 'Fresh Ceramics is a brand of Meghna Ceramic Industries Ltd.',
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings_social_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"platform" varchar NOT NULL,
	"url" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sizes" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" "enum_sizes_category" NOT NULL,
	"width_cm" numeric NOT NULL,
	"height_cm" numeric NOT NULL,
	"label" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "spaces" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"hero_image_id" integer,
	"order" numeric DEFAULT 0,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "spaces_locales" (
	"name" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"exclusive_showrooms" numeric DEFAULT 79 NOT NULL,
	"flagship_centres" numeric DEFAULT 2 NOT NULL,
	"authorised_dealers" numeric DEFAULT 120 NOT NULL,
	"floor_design_count" numeric DEFAULT 204 NOT NULL,
	"wall_design_count" numeric DEFAULT 181 NOT NULL,
	"total_design_count" numeric DEFAULT 385 NOT NULL,
	"annual_production_m2" varchar DEFAULT '18.6 million' NOT NULL,
	"established_year" numeric DEFAULT 2021 NOT NULL,
	"global_standard_tests" numeric DEFAULT 14 NOT NULL,
	"export_quality_grade_pct" numeric DEFAULT 98 NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" "enum_users_role" DEFAULT 'admin' NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"reset_password_requested_at" timestamp(3) with time zone,
	"login_attempts" numeric DEFAULT 0,
	"lock_until" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "users_sessions" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone,
	"expires_at" timestamp(3) with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "voices" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" "enum_voices_role" NOT NULL,
	"photo_id" integer,
	"sample" boolean DEFAULT false,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "voices_locales" (
	"name" varchar NOT NULL,
	"location" varchar,
	"quote" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "enum__locales" NOT NULL,
	"_parent_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles_locales" ADD CONSTRAINT "articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalogs" ADD CONSTRAINT "catalogs_series_id_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalogs" ADD CONSTRAINT "catalogs_pdf_id_media_id_fk" FOREIGN KEY ("pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalogs" ADD CONSTRAINT "catalogs_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalogs_locales" ADD CONSTRAINT "catalogs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."catalogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finishes" ADD CONSTRAINT "finishes_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finishes_locales" ADD CONSTRAINT "finishes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."finishes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "initiatives" ADD CONSTRAINT "initiatives_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "initiatives" ADD CONSTRAINT "initiatives_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "initiatives_locales" ADD CONSTRAINT "initiatives_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interiors" ADD CONSTRAINT "interiors_space_id_spaces_id_fk" FOREIGN KEY ("space_id") REFERENCES "public"."spaces"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interiors" ADD CONSTRAINT "interiors_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interiors_hotspots" ADD CONSTRAINT "interiors_hotspots_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interiors_hotspots" ADD CONSTRAINT "interiors_hotspots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."interiors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interiors_hotspots_locales" ADD CONSTRAINT "interiors_hotspots_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."interiors_hotspots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interiors_locales" ADD CONSTRAINT "interiors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."interiors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journey_chapters" ADD CONSTRAINT "journey_chapters_desktop_video_id_media_id_fk" FOREIGN KEY ("desktop_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journey_chapters" ADD CONSTRAINT "journey_chapters_mobile_video_id_media_id_fk" FOREIGN KEY ("mobile_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journey_chapters" ADD CONSTRAINT "journey_chapters_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journey_chapters" ADD CONSTRAINT "journey_chapters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journey_chapters_locales" ADD CONSTRAINT "journey_chapters_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey_chapters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journey_slim_variants" ADD CONSTRAINT "journey_slim_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journey"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "legacy_page_settings_locales" ADD CONSTRAINT "legacy_page_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legacy_page_settings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "legacy_page_settings_sustainability_pillars" ADD CONSTRAINT "legacy_page_settings_sustainability_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legacy_page_settings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "legacy_page_settings_sustainability_pillars_locales" ADD CONSTRAINT "legacy_page_settings_sustainability_pillars_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legacy_page_settings_sustainability_pillars"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "navigation_footer_groups" ADD CONSTRAINT "navigation_footer_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "navigation_footer_groups_links" ADD CONSTRAINT "navigation_footer_groups_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "navigation_footer_groups_links_locales" ADD CONSTRAINT "navigation_footer_groups_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_groups_links"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "navigation_footer_groups_locales" ADD CONSTRAINT "navigation_footer_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "navigation_header_nav" ADD CONSTRAINT "navigation_header_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "navigation_header_nav_locales" ADD CONSTRAINT "navigation_header_nav_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_header_nav"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_download_center" ADD CONSTRAINT "pages_blocks_download_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_download_center_locales" ADD CONSTRAINT "pages_blocks_download_center_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_download_center"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_hero_scene" ADD CONSTRAINT "pages_blocks_hero_scene_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_hero_scene" ADD CONSTRAINT "pages_blocks_hero_scene_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_hero_scene_locales" ADD CONSTRAINT "pages_blocks_hero_scene_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_scene"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_rich_text_section" ADD CONSTRAINT "pages_blocks_rich_text_section_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_rich_text_section" ADD CONSTRAINT "pages_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_rich_text_section_locales" ADD CONSTRAINT "pages_blocks_rich_text_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text_section"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_showroom_network" ADD CONSTRAINT "pages_blocks_showroom_network_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_showroom_network_locales" ADD CONSTRAINT "pages_blocks_showroom_network_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_showroom_network"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_stats_banner" ADD CONSTRAINT "pages_blocks_stats_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_story_chapter" ADD CONSTRAINT "pages_blocks_story_chapter_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_story_chapter" ADD CONSTRAINT "pages_blocks_story_chapter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_story_chapter_locales" ADD CONSTRAINT "pages_blocks_story_chapter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_story_chapter"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_tile_grid_showcase" ADD CONSTRAINT "pages_blocks_tile_grid_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_blocks_tile_grid_showcase_locales" ADD CONSTRAINT "pages_blocks_tile_grid_showcase_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tile_grid_showcase"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_finishes_fk" FOREIGN KEY ("finishes_id") REFERENCES "public"."finishes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sizes_fk" FOREIGN KEY ("sizes_id") REFERENCES "public"."sizes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_series_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_spaces_fk" FOREIGN KEY ("spaces_id") REFERENCES "public"."spaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_interiors_fk" FOREIGN KEY ("interiors_id") REFERENCES "public"."interiors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_catalogs_fk" FOREIGN KEY ("catalogs_id") REFERENCES "public"."catalogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_showrooms_fk" FOREIGN KEY ("showrooms_id") REFERENCES "public"."showrooms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_initiatives_fk" FOREIGN KEY ("initiatives_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_voices_fk" FOREIGN KEY ("voices_id") REFERENCES "public"."voices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_claims_fk" FOREIGN KEY ("claims_id") REFERENCES "public"."claims"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_finish_id_finishes_id_fk" FOREIGN KEY ("finish_id") REFERENCES "public"."finishes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_size_id_sizes_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."sizes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_series_id_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_tileable_texture_id_media_id_fk" FOREIGN KEY ("tileable_texture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_spaces_fk" FOREIGN KEY ("spaces_id") REFERENCES "public"."spaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "series" ADD CONSTRAINT "series_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "series_locales" ADD CONSTRAINT "series_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "showrooms" ADD CONSTRAINT "showrooms_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "showrooms_locales" ADD CONSTRAINT "showrooms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."showrooms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spaces" ADD CONSTRAINT "spaces_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spaces_locales" ADD CONSTRAINT "spaces_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voices" ADD CONSTRAINT "voices_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voices_locales" ADD CONSTRAINT "voices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."voices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "articles_cover_idx" ON "articles" USING btree ("cover_id");--> statement-breakpoint
CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "articles_locales_locale_parent_id_unique" ON "articles_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "articles_locales_parent_id_idx" ON "articles_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "catalogs_series_idx" ON "catalogs" USING btree ("series_id");--> statement-breakpoint
CREATE INDEX "catalogs_pdf_idx" ON "catalogs" USING btree ("pdf_id");--> statement-breakpoint
CREATE INDEX "catalogs_cover_image_idx" ON "catalogs" USING btree ("cover_image_id");--> statement-breakpoint
CREATE INDEX "catalogs_updated_at_idx" ON "catalogs" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "catalogs_created_at_idx" ON "catalogs" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "catalogs_locales_locale_parent_id_unique" ON "catalogs_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "catalogs_locales_parent_id_idx" ON "catalogs_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "claims_key_idx" ON "claims" USING btree ("key");--> statement-breakpoint
CREATE INDEX "claims_updated_at_idx" ON "claims" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "claims_created_at_idx" ON "claims" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "enquiries_updated_at_idx" ON "enquiries" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "finishes_slug_idx" ON "finishes" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "finishes_hero_image_idx" ON "finishes" USING btree ("hero_image_id");--> statement-breakpoint
CREATE INDEX "finishes_updated_at_idx" ON "finishes" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "finishes_created_at_idx" ON "finishes" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "finishes_locales_locale_parent_id_unique" ON "finishes_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "finishes_locales_parent_id_idx" ON "finishes_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "initiatives_slug_idx" ON "initiatives" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "initiatives_cover_image_idx" ON "initiatives" USING btree ("cover_image_id");--> statement-breakpoint
CREATE INDEX "initiatives_video_idx" ON "initiatives" USING btree ("video_id");--> statement-breakpoint
CREATE INDEX "initiatives_updated_at_idx" ON "initiatives" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "initiatives_created_at_idx" ON "initiatives" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "initiatives_locales_locale_parent_id_unique" ON "initiatives_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "initiatives_locales_parent_id_idx" ON "initiatives_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "initiatives_rels_order_idx" ON "initiatives_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "initiatives_rels_parent_idx" ON "initiatives_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "initiatives_rels_path_idx" ON "initiatives_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "initiatives_rels_media_id_idx" ON "initiatives_rels" USING btree ("media_id");--> statement-breakpoint
CREATE INDEX "interiors_space_idx" ON "interiors" USING btree ("space_id");--> statement-breakpoint
CREATE INDEX "interiors_image_idx" ON "interiors" USING btree ("image_id");--> statement-breakpoint
CREATE INDEX "interiors_updated_at_idx" ON "interiors" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "interiors_created_at_idx" ON "interiors" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "interiors_hotspots_order_idx" ON "interiors_hotspots" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "interiors_hotspots_parent_id_idx" ON "interiors_hotspots" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "interiors_hotspots_product_idx" ON "interiors_hotspots" USING btree ("product_id");--> statement-breakpoint
CREATE UNIQUE INDEX "interiors_hotspots_locales_locale_parent_id_unique" ON "interiors_hotspots_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "interiors_hotspots_locales_parent_id_idx" ON "interiors_hotspots_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "interiors_locales_locale_parent_id_unique" ON "interiors_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "interiors_locales_parent_id_idx" ON "interiors_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "journey_chapters_order_idx" ON "journey_chapters" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "journey_chapters_parent_id_idx" ON "journey_chapters" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "journey_chapters_desktop_video_idx" ON "journey_chapters" USING btree ("desktop_video_id");--> statement-breakpoint
CREATE INDEX "journey_chapters_mobile_video_idx" ON "journey_chapters" USING btree ("mobile_video_id");--> statement-breakpoint
CREATE INDEX "journey_chapters_poster_idx" ON "journey_chapters" USING btree ("poster_id");--> statement-breakpoint
CREATE UNIQUE INDEX "journey_chapters_locales_locale_parent_id_unique" ON "journey_chapters_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "journey_chapters_locales_parent_id_idx" ON "journey_chapters_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "journey_slim_variants_order_idx" ON "journey_slim_variants" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "journey_slim_variants_parent_id_idx" ON "journey_slim_variants" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "legacy_page_settings_locales_locale_parent_id_unique" ON "legacy_page_settings_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "legacy_page_settings_locales_parent_id_idx" ON "legacy_page_settings_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "legacy_page_settings_sustainability_pillars_order_idx" ON "legacy_page_settings_sustainability_pillars" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "legacy_page_settings_sustainability_pillars_parent_id_idx" ON "legacy_page_settings_sustainability_pillars" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "legacy_page_settings_sustainability_pillars_locales_locale_p" ON "legacy_page_settings_sustainability_pillars_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "legacy_page_settings_sustainability_pillars_locales_pare_idx" ON "legacy_page_settings_sustainability_pillars_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");--> statement-breakpoint
CREATE INDEX "navigation_footer_groups_order_idx" ON "navigation_footer_groups" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "navigation_footer_groups_parent_id_idx" ON "navigation_footer_groups" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "navigation_footer_groups_links_order_idx" ON "navigation_footer_groups_links" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "navigation_footer_groups_links_parent_id_idx" ON "navigation_footer_groups_links" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "navigation_footer_groups_links_locales_locale_parent_id_uniq" ON "navigation_footer_groups_links_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "navigation_footer_groups_links_locales_parent_id_idx" ON "navigation_footer_groups_links_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "navigation_footer_groups_locales_locale_parent_id_unique" ON "navigation_footer_groups_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "navigation_footer_groups_locales_parent_id_idx" ON "navigation_footer_groups_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "navigation_header_nav_order_idx" ON "navigation_header_nav" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "navigation_header_nav_parent_id_idx" ON "navigation_header_nav" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "navigation_header_nav_locales_locale_parent_id_unique" ON "navigation_header_nav_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "navigation_header_nav_locales_parent_id_idx" ON "navigation_header_nav_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "pages_meta_meta_og_image_idx" ON "pages" USING btree ("meta_og_image_id");--> statement-breakpoint
CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "pages_blocks_download_center_order_idx" ON "pages_blocks_download_center" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "pages_blocks_download_center_parent_id_idx" ON "pages_blocks_download_center" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_download_center_path_idx" ON "pages_blocks_download_center" USING btree ("_path");--> statement-breakpoint
CREATE UNIQUE INDEX "pages_blocks_download_center_locales_locale_parent_id_unique" ON "pages_blocks_download_center_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_download_center_locales_parent_id_idx" ON "pages_blocks_download_center_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_hero_scene_order_idx" ON "pages_blocks_hero_scene" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "pages_blocks_hero_scene_parent_id_idx" ON "pages_blocks_hero_scene" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_hero_scene_path_idx" ON "pages_blocks_hero_scene" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "pages_blocks_hero_scene_background_image_idx" ON "pages_blocks_hero_scene" USING btree ("background_image_id");--> statement-breakpoint
CREATE UNIQUE INDEX "pages_blocks_hero_scene_locales_locale_parent_id_unique" ON "pages_blocks_hero_scene_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_hero_scene_locales_parent_id_idx" ON "pages_blocks_hero_scene_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_rich_text_section_order_idx" ON "pages_blocks_rich_text_section" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "pages_blocks_rich_text_section_parent_id_idx" ON "pages_blocks_rich_text_section" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_rich_text_section_path_idx" ON "pages_blocks_rich_text_section" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "pages_blocks_rich_text_section_media_idx" ON "pages_blocks_rich_text_section" USING btree ("media_id");--> statement-breakpoint
CREATE UNIQUE INDEX "pages_blocks_rich_text_section_locales_locale_parent_id_uniq" ON "pages_blocks_rich_text_section_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_rich_text_section_locales_parent_id_idx" ON "pages_blocks_rich_text_section_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_showroom_network_order_idx" ON "pages_blocks_showroom_network" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "pages_blocks_showroom_network_parent_id_idx" ON "pages_blocks_showroom_network" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_showroom_network_path_idx" ON "pages_blocks_showroom_network" USING btree ("_path");--> statement-breakpoint
CREATE UNIQUE INDEX "pages_blocks_showroom_network_locales_locale_parent_id_uniqu" ON "pages_blocks_showroom_network_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_showroom_network_locales_parent_id_idx" ON "pages_blocks_showroom_network_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_stats_banner_order_idx" ON "pages_blocks_stats_banner" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "pages_blocks_stats_banner_parent_id_idx" ON "pages_blocks_stats_banner" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_stats_banner_path_idx" ON "pages_blocks_stats_banner" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "pages_blocks_story_chapter_order_idx" ON "pages_blocks_story_chapter" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "pages_blocks_story_chapter_parent_id_idx" ON "pages_blocks_story_chapter" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_story_chapter_path_idx" ON "pages_blocks_story_chapter" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "pages_blocks_story_chapter_image_idx" ON "pages_blocks_story_chapter" USING btree ("image_id");--> statement-breakpoint
CREATE UNIQUE INDEX "pages_blocks_story_chapter_locales_locale_parent_id_unique" ON "pages_blocks_story_chapter_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_story_chapter_locales_parent_id_idx" ON "pages_blocks_story_chapter_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_tile_grid_showcase_order_idx" ON "pages_blocks_tile_grid_showcase" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "pages_blocks_tile_grid_showcase_parent_id_idx" ON "pages_blocks_tile_grid_showcase" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_tile_grid_showcase_path_idx" ON "pages_blocks_tile_grid_showcase" USING btree ("_path");--> statement-breakpoint
CREATE UNIQUE INDEX "pages_blocks_tile_grid_showcase_locales_locale_parent_id_uni" ON "pages_blocks_tile_grid_showcase_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "pages_blocks_tile_grid_showcase_locales_parent_id_idx" ON "pages_blocks_tile_grid_showcase_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_finishes_id_idx" ON "payload_locked_documents_rels" USING btree ("finishes_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_sizes_id_idx" ON "payload_locked_documents_rels" USING btree ("sizes_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_series_id_idx" ON "payload_locked_documents_rels" USING btree ("series_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_spaces_id_idx" ON "payload_locked_documents_rels" USING btree ("spaces_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_interiors_id_idx" ON "payload_locked_documents_rels" USING btree ("interiors_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_catalogs_id_idx" ON "payload_locked_documents_rels" USING btree ("catalogs_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_showrooms_id_idx" ON "payload_locked_documents_rels" USING btree ("showrooms_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_initiatives_id_idx" ON "payload_locked_documents_rels" USING btree ("initiatives_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_voices_id_idx" ON "payload_locked_documents_rels" USING btree ("voices_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_claims_id_idx" ON "payload_locked_documents_rels" USING btree ("claims_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("enquiries_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");--> statement-breakpoint
CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");--> statement-breakpoint
CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");--> statement-breakpoint
CREATE UNIQUE INDEX "products_code_idx" ON "products" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "products_finish_idx" ON "products" USING btree ("finish_id");--> statement-breakpoint
CREATE INDEX "products_size_idx" ON "products" USING btree ("size_id");--> statement-breakpoint
CREATE INDEX "products_series_idx" ON "products" USING btree ("series_id");--> statement-breakpoint
CREATE INDEX "products_tileable_texture_idx" ON "products" USING btree ("tileable_texture_id");--> statement-breakpoint
CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "products_locales_parent_id_idx" ON "products_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "products_rels_spaces_id_idx" ON "products_rels" USING btree ("spaces_id");--> statement-breakpoint
CREATE INDEX "products_rels_media_id_idx" ON "products_rels" USING btree ("media_id");--> statement-breakpoint
CREATE UNIQUE INDEX "series_slug_idx" ON "series" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "series_hero_image_idx" ON "series" USING btree ("hero_image_id");--> statement-breakpoint
CREATE INDEX "series_updated_at_idx" ON "series" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "series_created_at_idx" ON "series" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "series_locales_locale_parent_id_unique" ON "series_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "series_locales_parent_id_idx" ON "series_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "showrooms_division_idx" ON "showrooms" USING btree ("division");--> statement-breakpoint
CREATE INDEX "showrooms_district_idx" ON "showrooms" USING btree ("district");--> statement-breakpoint
CREATE INDEX "showrooms_photo_idx" ON "showrooms" USING btree ("photo_id");--> statement-breakpoint
CREATE INDEX "showrooms_updated_at_idx" ON "showrooms" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "showrooms_created_at_idx" ON "showrooms" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "showrooms_locales_locale_parent_id_unique" ON "showrooms_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "showrooms_locales_parent_id_idx" ON "showrooms_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "site_settings_locales_parent_id_idx" ON "site_settings_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "sizes_slug_idx" ON "sizes" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "sizes_updated_at_idx" ON "sizes" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "sizes_created_at_idx" ON "sizes" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "spaces_slug_idx" ON "spaces" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "spaces_hero_image_idx" ON "spaces" USING btree ("hero_image_id");--> statement-breakpoint
CREATE INDEX "spaces_updated_at_idx" ON "spaces" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "spaces_created_at_idx" ON "spaces" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "spaces_locales_locale_parent_id_unique" ON "spaces_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "spaces_locales_parent_id_idx" ON "spaces_locales" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "voices_photo_idx" ON "voices" USING btree ("photo_id");--> statement-breakpoint
CREATE INDEX "voices_updated_at_idx" ON "voices" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "voices_created_at_idx" ON "voices" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "voices_locales_locale_parent_id_unique" ON "voices_locales" USING btree ("_locale","_parent_id");--> statement-breakpoint
CREATE INDEX "voices_locales_parent_id_idx" ON "voices_locales" USING btree ("_parent_id");