
import { ContentItem, Fields } from 'kentico-cloud-delivery';

/**
 * This class was generated by 'kentico-cloud-model-generator-utility' at Sun Sep 09 2018 10:50:06 GMT-0400 (Eastern Daylight Time).
 *
 * Note: You can substitute 'ContentItem' type with another generated class. Generator doesn't have this information available
 * and so its up to you to define relationship between models.
 */
export class Projects extends ContentItem {
    public shortIntro: Fields.RichTextField;
    public skills: Fields.MultipleChoiceField;
    public projectHeaderImage: Fields.AssetsField;
    public fullText: Fields.RichTextField;
    public sortOrder: Fields.NumberField;
    public links: Fields.RichTextField;
    public urlslug: Fields.UrlSlugField;
    public projectType: Fields.MultipleChoiceField;
    public projectName: Fields.TextField;
    public projectDate: Fields.DateTimeField;
    constructor() {
        super({
            propertyResolver: ((fieldName: string) => {
                if (fieldName === 'short_intro') {
                    return 'shortIntro';
                }
                if (fieldName === 'project_header_image') {
                    return 'projectHeaderImage';
                }
                if (fieldName === 'full_text') {
                    return 'fullText';
                }
                if (fieldName === 'sort_order') {
                    return 'sortOrder';
                }
                if (fieldName === 'project_type') {
                    return 'projectType';
                }
                if (fieldName === 'project_name') {
                    return 'projectName';
                }
                if (fieldName === 'project_date') {
                    return 'projectDate';
                }
                return fieldName;
            })
        });
    }
}
