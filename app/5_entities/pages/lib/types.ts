import { inherits } from "util";

export interface GetPagesResponse {
    id: number;
    slug: string;
    title: {
        rendered: string;
    }
}

export interface Page {
    acf: {
        pages_content: { acf_fc_layout: SectionTitles }[]
    }
}


interface Section<T extends SectionTitles> {
    acf_fc_layout: T;
}

export type SectionTitles = 'hero' | 'feature' | 'stats';

export interface HeroSection extends Section<'hero'> {
    title: string;
    text: string;
}

export interface FeatureSection extends Section<'feature'> {
    subtitle: string;
    title: string;
    text: string;
    list: {
        heroicon_name: string;
        text: string;
    }[]
    image: string;
}

export interface StatsSection extends Section<'stats'> {
    list: {
        stat: string;
        desc: string;
    }[]
}

export interface DefaultParams {
    local?: string;
}

export interface GetPageParams extends DefaultParams {
    slug: string;
}