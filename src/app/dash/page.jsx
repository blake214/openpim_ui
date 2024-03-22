"use client"

import { usePathname, useRouter } from 'next/navigation'
import { createDatabaseUuidKey, createLocalUuidKey } from '@/lib/helpers';
import CustomButton from "@/components/custom_button/custom_button";

export default function DashPage() {
	// ======= Hooks
    const router = useRouter();
    const location = usePathname()
    // ======= Hooks

	// ======= Create unregistered entity
    const handleCreateUnregisteredEntity = () => {
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
            content: ""
        }));

        router.push(`${location}/products/create/${create_unregistered_entity_id}`) // The path just needs to go to _handel somehow
    }
    // ======= Create unregistered entity

	// ======= Create video
    const handleCreateVideo = () => {
        const create_video_id = createLocalUuidKey()
        const video_external_url_id = createLocalUuidKey(create_video_id)
        const video_alt_text_id = createLocalUuidKey(create_video_id)
		const video_description_id = createLocalUuidKey(create_video_id)
		const video_loopable_id = createLocalUuidKey(create_video_id)
		const video_language_id_id = createLocalUuidKey(create_video_id)

        localStorage?.setItem(create_video_id, JSON.stringify({
            type: "create_video",
            title: "create_video",
            content: {
                external_url: video_external_url_id,
                alt_text: video_alt_text_id,
				description: video_description_id,
				loopable: video_loopable_id,
				language_id: video_language_id_id,
            }
        }));

        localStorage?.setItem(video_external_url_id, JSON.stringify({
            type: "edit",
            sub_type: "video_external_url",
            title: "external_url",
            content: "https://www.youtube.com/watch?v=xLp7Hu1PAX0&ab_channel=LeAwLeaveEverythingandWander-Luca%26Sara"
        }));

        localStorage?.setItem(video_alt_text_id, JSON.stringify({
            type: "edit",
            sub_type: "media_alt_text",
            title: "alt_text",
            content: "alternative"
        }));

		localStorage?.setItem(video_description_id, JSON.stringify({
            type: "edit",
            sub_type: "media_description",
            title: "desciption",
            content: "desciption"
        }));

		localStorage?.setItem(video_loopable_id, JSON.stringify({
            type: "edit",
            sub_type: "video_loopable",
            title: "loopable",
            content: false
        }));

		localStorage?.setItem(video_language_id_id, JSON.stringify({
            type: "edit",
            sub_type: "media_language_id",
            title: "language",
            content: "AAOA"
        }));

        router.push(`${location}/products/create/${create_video_id}`) // The path just needs to go to _handel somehow
    }
    // ======= Create video

    // ======= Create pdf
    const handleCreatePdf = async () => {
        const create_pdf_id = createLocalUuidKey()
        const pdf_alt_text_id = createLocalUuidKey(create_pdf_id)
		const pdf_description_id = createLocalUuidKey(create_pdf_id)
		const pdf_language_id_id = createLocalUuidKey(create_pdf_id)
        const files_id = createLocalUuidKey(create_pdf_id)

        const database_table_id = createDatabaseUuidKey()

        localStorage?.setItem(create_pdf_id, JSON.stringify({
            type: "create_pdf",
            title: "create_pdf",
            content: {
                alt_text: pdf_alt_text_id,
				description: pdf_description_id,
				language_id: pdf_language_id_id,
                files_id: files_id
            }
        }));

        localStorage?.setItem(pdf_alt_text_id, JSON.stringify({
            type: "edit",
            sub_type: "media_alt_text",
            title: "alt_text",
            content: "alternative"
        }));

		localStorage?.setItem(pdf_description_id, JSON.stringify({
            type: "edit",
            sub_type: "media_description",
            title: "desciption",
            content: "desciption"
        }));

		localStorage?.setItem(pdf_language_id_id, JSON.stringify({
            type: "edit",
            sub_type: "media_language_id",
            title: "language",
            content: "AAOA"
        }));

        localStorage?.setItem(files_id, JSON.stringify({
            type: "edit",
            sub_type: "media_files",
            title: "media_files",
            max_files: 1,
            file_types: ["application/pdf"],
            content: database_table_id
        }));

        router.push(`${location}/products/create/${create_pdf_id}`) // The path just needs to go to _handel somehow
    }
    // ======= Create pdf

    // ======= Create image
    const handleCreateImage = async () => {
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
                    caption_image_id : "xxx",
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

        router.push(`${location}/products/create/${create_image_id}`) // The path just needs to go to _handel somehow
    }
    // ======= Create image

    return (
        <div>
			<div className={"button_fixed_width"}><CustomButton component_type="vertical" onClick={handleCreateUnregisteredEntity} >Test .... Create unregistered entity</CustomButton></div>
			<div className={"button_fixed_width"}><CustomButton component_type="vertical" onClick={handleCreateVideo} >Test .... Create video</CustomButton></div>
            <div className={"button_fixed_width"}><CustomButton component_type="vertical" onClick={handleCreatePdf} >Test .... Create pdf</CustomButton></div>
            <div className={"button_fixed_width"}><CustomButton component_type="vertical" onClick={handleCreateImage} >Test .... Create image</CustomButton></div>
        </div>
    );
}
