import { SiteClient } from 'datocms-client'


export default async function createCommunity(request, response) {
    const client = new SiteClient('57e0157059ca95e4f8d35d4ce7bb6c')
    if (request.method === 'POST') {

        const dataTitle = request.body.title;
        const dataImg = request.body.imageUrl;
        const dataSlug = request.body.creatorSlug;

        const newCommunity = await client.items.create({
            itemType: '968414',
            title: dataTitle,
            imageUrl: dataImg,
            creatorSlug: dataSlug
        });

        response.json({
            newRegister: newCommunity
        })

    }
}
