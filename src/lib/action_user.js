import { createDatabaseUuidKey, createLocalUuidKey } from "./helpers";

// ======= Create unregistered entity
export const handleCreateUnregisteredEntity = () => {
    const create_unregistered_entity_id = createLocalUuidKey()
    const product_entity_types_id = createLocalUuidKey(create_unregistered_entity_id)
    const product_entity_name_id = createLocalUuidKey(create_unregistered_entity_id)

    localStorage?.setItem(create_unregistered_entity_id, JSON.stringify({
        type: "create_unregistered_entity",
        title: "create_unregistered_entity",
        content: {
            entity_types: product_entity_types_id,
            entity_name: product_entity_name_id,
        }
    }));

    localStorage?.setItem(product_entity_types_id, JSON.stringify({
        type: "edit",
        sub_type: "unregistered_entity_types",
        title: "entity_types",
        content: ["AAXA"]
    }));

    localStorage?.setItem(product_entity_name_id, JSON.stringify({
        type: "edit",
        sub_type: "unregistered_entity_name",
        title: "entity_name",
        content: "Samsung"
    }));

    return create_unregistered_entity_id
};
// ======= Create unregistered entity

// ======= Create temp product
export const handleCreateTempProduct = () => {
    const create_product_id = createLocalUuidKey()
    const product_names_id = createLocalUuidKey(create_product_id)
    const product_series_id = createLocalUuidKey(create_product_id)
    const product_title_id = createLocalUuidKey(create_product_id)
    const product_description_id = createLocalUuidKey(create_product_id)
    const product_summary_id = createLocalUuidKey(create_product_id)
    const product_packaging_id = createLocalUuidKey(create_product_id)
    const product_entity_id = createLocalUuidKey(create_product_id)

    localStorage?.setItem(create_product_id, JSON.stringify({
        type: "create_product",
        title: "create_product",
        content: {
            names: product_names_id,
            series: product_series_id,
            title: product_title_id,
            description: product_description_id,
            summary: product_summary_id,
            packaging: product_packaging_id,
            entity_id: product_entity_id,
        }
    }));

    localStorage?.setItem(product_names_id, JSON.stringify({
        type: "edit",
        sub_type: "product_names",
        title: "names",
        content: [
            {
                name: "iPhone",
                language_id: "AAOA"
            }
        ]
    }));

    localStorage?.setItem(product_series_id, JSON.stringify({
        type: "edit",
        sub_type: "product_series",
        title: "series",
        content: ""
    }));

    localStorage?.setItem(product_title_id, JSON.stringify({
        type: "edit",
        sub_type: "product_title",
        title: "title",
        content: {
            short: "Short",
            long: "Longier"
        }
    }));

    localStorage?.setItem(product_description_id, JSON.stringify({
        type: "edit",
        sub_type: "product_description",
        title: "description",
        content: {
            short: "Short",
            long: "Longier"
        }
    }));

    localStorage?.setItem(product_summary_id, JSON.stringify({
        type: "edit",
        sub_type: "product_summary",
        title: "summary",
        content: {
            short: "Short",
            long: "Longier"
        }
    }));

    localStorage?.setItem(product_packaging_id, JSON.stringify({
        type: "edit",
        sub_type: "product_packaging",
        title: "packaging",
        content: {
            packaging_type: "AAYA",
            width: 50,
            height: 50,
            depth: 50,
            weight: 50
        }
    }));

    localStorage?.setItem(product_entity_id, JSON.stringify({
        type: "edit",
        sub_type: "product_entity",
        title: "product_entity",
        content: "66013366c4b4dc632eae8968"
    }));

    return create_product_id
};
// ======= Create temp product

// ======= Create image
export const handleCreateImage = () => {
    const create_image_id = createLocalUuidKey()
    const image_croppings_id = createLocalUuidKey(create_image_id)
    const image_captions_id = createLocalUuidKey(create_image_id)
    const image_alt_text_id = createLocalUuidKey(create_image_id)
    const image_description_id = createLocalUuidKey(create_image_id)
    const files_id = createLocalUuidKey(create_image_id)

    const database_table_id = createDatabaseUuidKey()

    localStorage?.setItem(create_image_id, JSON.stringify({
        type: "create_image",
        title: "create_image",
        content: {
            croppings: image_croppings_id,
            captions: image_captions_id,
            alt_text: image_alt_text_id,
            description: image_description_id,
            files_id: files_id
        }
    }));

    localStorage?.setItem(image_croppings_id, JSON.stringify({
        type: "edit",
        sub_type: "image_croppings",
        title: "croppings",
        extra: database_table_id,
        content: {
            version_sq: {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            },
            version_rec1: {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            },
            version_rec2: {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            }
        }
    }));

    localStorage?.setItem(image_captions_id, JSON.stringify({
        type: "edit",
        sub_type: "image_captions",
        title: "captions",
        extra: database_table_id,
        content: [
            {
                caption_image_id : null,
                content : "Hello world",
                co_ordinates : {
                    x_axis : 300,
                    y_axis : 150
                }
            },
            {
                caption_image_id : null,
                content : "Crule world",
                co_ordinates : {
                    x_axis : 600,
                    y_axis : 350
                }
            }
        ]
    }));

    localStorage?.setItem(image_alt_text_id, JSON.stringify({
        type: "edit",
        sub_type: "media_alt_text",
        title: "alt_text",
        content: "alternative"
    }));

    localStorage?.setItem(image_description_id, JSON.stringify({
        type: "edit",
        sub_type: "media_description",
        title: "desciption",
        content: "desciption"
    }));

    localStorage?.setItem(files_id, JSON.stringify({
        type: "edit",
        sub_type: "media_files",
        title: "media_files",
        max_files: 1,
        file_types: ["image/png"],
        content: database_table_id
    }));

    return create_image_id
}
// ======= Create image