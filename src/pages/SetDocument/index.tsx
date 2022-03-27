import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { create } from 'ipfs-http-client'
import { useAuctionState } from '../../store'

import {
    Wrapper
} from './styled'

import { useDocumentAuction } from '../../hooks/useDocumentAuction'

const SetDocuments = () => {

    const [website, setWebsite]: any = useState()
    const [medium, setMedium]: any = useState()
    const [description, setDescription]: any = useState()
    const [whitepaper, setWhitepaper]: any = useState()
    const [telegram, setTelegram]: any = useState()
    const [twitter, setTwitter]: any = useState()
    const [discord, setDiscord]: any = useState()
    const [desktopBanner, setDesktopBanner]: any = useState()
    const [icons, setIcon]: any = useState()
    const [mobileBanner, setMobileBanner]: any = useState()
    const [icon, setIcons]: any = useState()
    const [documents, setDocuments]: any = useState([])
    const [state]: any = useAuctionState()
    const id: any = useParams()

    const { setDocument, getDocument, setDocumentAll } = useDocumentAuction()

    const handleAddWebsite = async () => {
        await setDocument(id.id, 'website', website)
    }

    const handleAddMedium = async () => {
        await setDocument(id.id, 'medium', medium)
    }

    const handleAddDescription = async () => {
        await setDocument(id.id, 'description', description)
    }

    const handleAddWhitepaper = async () => {
        await setDocument(id.id, 'whitepaper', whitepaper)
    }

    const handleAddTelegram = async () => {
        await setDocument(id.id, 'telegram', telegram)
    }

    const handleAddTwitter = async () => {
        await setDocument(id.id, 'twitter', twitter)
    }

    const handleAddDiscord = async () => {
        await setDocument(id.id, 'discord', discord)
    }

    // const handleAddDesktopBanner = async () => {
    //     await setDocument(id.id, 'desktopBanner', desktopBanner)
    // }

    const handleAddIcon = async () => {
        var ipfs = await create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https'
        })
        await ipfs.add(icon).then((data) => {
            const iconURL = `https://ipfs.infura.io/ipfs/${data.path}`
            setDocument(id.id, 'icon', iconURL)
        })
    }

    // const handleAddMobileBanner = async () => {
    //     await setDocument(id.id, 'mobileBanner', mobileBanner)
    // }

    const chooseFile = (e: any) => {
        const file = e.target.files[0]
        const reader = new window.FileReader()
        showImage(file)
        reader.readAsArrayBuffer(file)
        reader.onloadend = (e) => {
            setIcons(reader.result)
        }
    }

    const showImage = (file: any) => {
        const reader = new window.FileReader() 
        reader.readAsDataURL(file)
        reader.onload = () => {
            setIcon(reader.result)
        }
    }

    const handleAddAll = async () => {
        var name: any = ['website', 'medium', 'description', 'whitepaper', 'telegram', 'twitter', 'discord', 'desktopBanner', 'icon', 'mobileBanner']
        var data: any = [website, medium, description, whitepaper, telegram, twitter, discord, desktopBanner, icons, mobileBanner]
        let indexRemove: any = []
        await data.map((item: any, index: number) => {
            if (item === null || item === undefined || item === '') {
                indexRemove.push(index);
            }
        })

        indexRemove.reverse()

        await indexRemove.map((item: any) => {
            name.splice(item, 1)
            data.splice(item, 1)
        })

        indexRemove = []

        await documents.map(async (item: any) => {
            if (name.indexOf(item.name) !== -1) {
                if (item.data === data[name.indexOf(item.name)]) {
                    indexRemove.push(name.indexOf(item.name))
                }
            }
        })

        indexRemove.reverse()

        await indexRemove.map((item: any) => {
            name.splice(item, 1)
            data.splice(item, 1)
        })

        if (name.indexOf('icon') !== -1) {
            var ipfs = await create({
                host: 'ipfs.infura.io',
                port: 5001,
                protocol: 'https'
            })
            await ipfs.add(icon).then((url) => {
                const iconURL = `https://ipfs.infura.io/ipfs/${url.path}`
                data[name.indexOf('icon')] = iconURL
            })
        }

        setDocumentAll(id.id, name, data)
    }

    useEffect(() => {
        getDocument(id.id).then(async (res) => {
            setDocuments(res.documents)
            await res.documents.map((item: any) => {
                if (item.name.toLowerCase() === 'website'){
                    setWebsite(item.data)
                } else if (item.name.toLowerCase() === 'medium'){
                    setMedium(item.data)
                } else if (item.name.toLowerCase() === 'description'){
                    setDescription(item.data)
                } else if (item.name.toLowerCase() === 'whitepaper'){
                    setWhitepaper(item.data)
                } else if (item.name.toLowerCase() === 'telegram'){
                    setTelegram(item.data)
                } else if (item.name.toLowerCase() === 'twitter'){
                    setTwitter(item.data)
                } else if (item.name.toLowerCase() === 'discord'){
                    setDiscord(item.data)
                } else if (item.name.toLowerCase() === 'desktopBanner'){
                    setDesktopBanner(item.data)
                } else if (item.name.toLowerCase() === 'icon'){
                    setIcon(item.data)
                } else if (item.name.toLowerCase() === 'mobileBanner'){
                    setMobileBanner(item.data)
                }
            })
        })
    },[])

    console.log(state.updatingDocs)

    return (
        <>
            <Wrapper>
                <Title size="2rem">Set Document</Title>
                <br />
                <br />
                <WrapperInside>
                    <Title margin="0rem 0" size="1.2rem">Website</Title>
                    <Input
                        onChange={(e) => {
                            setWebsite(e.target.value)
                        }}
                        placeholder=""
                        value={website} />
                    <br />
                    {
                        !state.updatingDocs
                        ? <Button onClick={() => handleAddWebsite()}>Add Website</Button>
                        : <Button className="disabled">Add Website</Button>
                    }
                </WrapperInside>
                <WrapperInside>
                    <Title margin="0rem 0" size="1.2rem">Medium</Title>
                    <Input
                        onChange={(e) => {
                            setMedium(e.target.value)
                        }}
                        placeholder=""
                        value={medium} />
                    <br />
                    {
                        !state.updatingDocs
                        ? <Button onClick={() => handleAddMedium()}>Add Medium</Button>
                        : <Button className="disabled">Add Medium</Button>
                    }
                </WrapperInside>
                <WrapperInside>
                    <Title margin="0rem 0" size="1.2rem">Description</Title>
                    <Input
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        placeholder=""
                        value={description} />
                    <br />
                    {
                        !state.updatingDocs
                        ? <Button onClick={() => handleAddDescription()}>Add Description</Button>
                        : <Button className="disabled">Add Description</Button>
                    }
                </WrapperInside>
                <WrapperInside>
                    <Title margin="0rem 0" size="1.2rem">Whitepaper</Title>
                    <Input
                        onChange={(e) => {
                            setWhitepaper(e.target.value)
                        }}
                        placeholder=""
                        value={whitepaper} />
                    <br />
                    {
                        !state.updatingDocs
                        ? <Button onClick={() => handleAddWhitepaper()}>Add Whitepaper</Button>
                        : <Button className="disabled">Add Whitepaper</Button>
                    }
                </WrapperInside>
                <WrapperInside>
                    <Title margin="0rem 0" size="1.2rem">Telegram</Title>
                    <Input
                        onChange={(e) => {
                            setTelegram(e.target.value)
                        }}
                        placeholder=""
                        value={telegram} />
                    <br />
                    {
                        !state.updatingDocs
                        ? <Button onClick={() => handleAddTelegram()}>Add Telegram</Button>
                        : <Button className="disabled">Add Telegram</Button>
                    }
                </WrapperInside>
                <WrapperInside>
                    <Title margin="0rem 0" size="1.2rem">Twitter</Title>
                    <Input
                        onChange={(e) => {
                            setTwitter(e.target.value)
                        }}
                        placeholder=""
                        value={twitter} />
                    <br />
                    {
                        !state.updatingDocs
                        ? <Button onClick={() => handleAddTwitter()}>Add Twitter</Button>
                        : <Button className="disabled">Add Twitter</Button>
                    }
                </WrapperInside>
                <WrapperInside>
                    <Title margin="0rem 0" size="1.2rem">Discord</Title>
                    <Input
                        onChange={(e) => {
                            setDiscord(e.target.value)
                        }}
                        placeholder=""
                        value={discord} />
                    <br />
                    {
                        !state.updatingDocs
                        ? <Button onClick={() => handleAddDiscord()}>Add Discord</Button>
                        : <Button className="disabled">Add Discord</Button>
                    }
                </WrapperInside>
                {/* <WrapperInside>
                    <Title margin="0rem 0" size="1.2rem">DesktopBanner</Title>
                    <Input
                        onChange={(e) => {
                            setDesktopBanner(e.target.value)
                        }}
                        placeholder=""
                        value={desktopBanner} />
                    <br />
                    <Button onClick={() => handleAddDesktopBanner()}>Add DesktopBanner</Button>
                </WrapperInside> */}
                <WrapperInside>
                    <Title margin="0rem 0" size="1.2rem">Icon</Title>
                    <Image src={icons} />
                    <Input style={{display: 'none'}}
                        id="icon"
                        onChange={(e) => {
                            chooseFile(e)
                        }}
                        type='file'
                        placeholder=""
                    />
                    <WrapperLabel>
                        <Label htmlFor="icon">Choose File</Label>
                    </WrapperLabel>
                    <br />
                    {
                        !state.updatingDocs
                        ? <Button onClick={() => handleAddIcon()}>Add Icon</Button>
                        : <Button className="disabled">Add Icon</Button>
                    }
                </WrapperInside>
                {/* <WrapperInside>
                    <Title margin="0rem 0" size="1.2rem">MobileBanner</Title>
                    <Input
                        onChange={(e) => {
                            setMobileBanner(e.target.value)
                        }}
                        placeholder=""
                        value={mobileBanner} />
                    <br />
                    <Button onClick={() => handleAddMobileBanner()}>Add MobileBanner</Button>
                </WrapperInside> */}
                <WrapperInside>
                {
                    !state.updatingDocs
                    ? <Button onClick={() => handleAddAll()}>Add All Document</Button>
                    : <Button className="disabled">Add All Document</Button>
                }
                </WrapperInside>
            </Wrapper>
        </>
    )
}

export default SetDocuments

export const Title = styled.div<{size?: string, margin?: string}>`
    font-size: ${({size}) => size ? size : "2rem"};
    margin: ${({margin}) => margin ? margin : "1.5rem 0"};
`;

export const Input = styled.input`
    min-width: 50%;
    padding: 7px;
    border-radius: 5px;
    background: none;
    margin: .5rem 0;
    border: 1px solid #acacac;
    color: #fff;
`;

export const Button = styled.div`
    width: 200px;
    height: 36px;
    background-image: linear-gradient(to right,#7cf95b,#4da2ea);
    border: none;
    border-radius: 5px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &.disabled {
        background: #c5c5c5;
        cursor: not-allowed;
    }
`;

const WrapperInside = styled.div`
    padding: 2rem 0;
`;

const Label = styled.label`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
`;

const WrapperLabel = styled.div`
    min-height: 31px;
    position: relative;
    width: 50%;
    border: 1px solid #ffff;
    padding: 7px;
    border-radius: 5px;
    margin-top: 10px;
`;

const Image = styled.img`
    width: 100px;
    margin: 10px;
`;
