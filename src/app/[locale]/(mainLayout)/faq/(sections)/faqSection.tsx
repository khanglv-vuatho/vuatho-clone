'use client'

import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

function FaqSection() {
  const t = useTranslations('FaqSection')

  const [activeSelect, setActiveSelect] = useState<string>(t('listAccordion.title1'))
  const [childActive, setChildActive] = useState(['0'])

  const highlightRef = useRef(null)

  const listAccordion: any = [
    {
      title: t('listAccordion.title1'),
      children: [
        {
          title: t('listAccordion.children1.title1'),
          children: [
            {
              title: t('listAccordion.children1.children1.title1')
            },
            {
              title: t('listAccordion.children1.children1.title2')
            },
            {
              title: t('listAccordion.children1.children1.title3')
            }
          ]
        },
        {
          title: t('listAccordion.children1.title2'),
          children: [
            {
              title: t('listAccordion.children1.children2.title1')
            },
            {
              title: t('listAccordion.children1.children2.title2')
            },
            {
              title: t('listAccordion.children1.children2.title3')
            },
            {
              title: t('listAccordion.children1.children2.title4')
            }
          ]
        }
      ]
    },
    {
      title: t('listAccordion.title2'),
      children: [
        {
          title: t('listAccordion.children2.title1'),
          children: [
            {
              title: t('listAccordion.children2.children1.title1')
            }
          ]
        },
        {
          title: t('listAccordion.children2.title2'),
          children: [
            {
              title: t('listAccordion.children2.children2.title1')
            }
          ]
        },
        {
          title: t('listAccordion.children2.title3'),
          children: [
            {
              title: t('listAccordion.children2.children3.title1')
            }
          ]
        },

        {
          title: t('listAccordion.children2.title4'),
          children: [
            {
              title: t('listAccordion.children2.children4.title1')
            }
          ]
        },
        {
          title: t('listAccordion.children2.title5'),
          children: [
            {
              title: t('listAccordion.children2.children5.title1')
            }
          ]
        },
        {
          title: t('listAccordion.children2.title6'),
          children: [
            {
              title: t('listAccordion.children2.children6.title1')
            }
          ]
        },
        {
          title: t('listAccordion.children2.title7'),
          children: [
            {
              title: t('listAccordion.children2.children7.title1')
            }
          ]
        },
        {
          title: t('listAccordion.children2.title8'),
          children: [
            {
              title: t('listAccordion.children2.children8.title1')
            }
          ]
        },
        {
          title: t('listAccordion.children2.title9'),
          children: [
            {
              title: t('listAccordion.children2.children9.title1')
            },
            {
              title: t('listAccordion.children2.children9.title2')
            },
            {
              title: t('listAccordion.children2.children9.title3')
            },
            {
              title: t('listAccordion.children2.children9.title4')
            },
            {
              title: t('listAccordion.children2.children9.title5')
            }
          ]
        },
        {
          title: t('listAccordion.children2.title10'),
          children: [
            {
              title: t('listAccordion.children2.children10.title1')
            }
          ]
        }
      ]
    },
    {
      title: t('listAccordion.title4'),
      children: [
        {
          title: t('listAccordion.children4.title1'),
          children: [
            {
              title: t('listAccordion.children4.children1.title1')
            },
            { title: t('listAccordion.children4.children1.title2') },
            {
              title: t('listAccordion.children4.children1.title3')
            }
          ]
        },
        {
          title: t('listAccordion.children4.title2'),
          children: [
            {
              title: t('listAccordion.children4.children2.title1')
            }
          ]
        },
        {
          title: t('listAccordion.children4.title3'),
          children: [
            {
              title: t('listAccordion.children4.children3.title1')
            }
          ]
        }
      ]
    },
    {
      title: t('listAccordion.title5'),
      children: [
        {
          title: t('listAccordion.children5.title1'),
          children: [
            {
              title: t('listAccordion.children5.children1.title1'),
              bold: true
            },
            {
              title: t('listAccordion.children5.children1.title2')
            },
            {
              title: t('listAccordion.children5.children1.title3'),
              bold: true
            },
            {
              title: t('listAccordion.children5.children1.title4')
            },
            {
              title: t('listAccordion.children5.children1.title5'),
              bold: true
            },
            {
              title: t('listAccordion.children5.children1.title6')
            },
            {
              title: t('listAccordion.children5.children1.title7'),
              bold: true
            },
            {
              title: t('listAccordion.children5.children1.title8')
            }
          ]
        },
        {
          title: t('listAccordion.children5.title2'),
          children: [
            {
              title: t('listAccordion.children5.children2.title1'),
              bold: true
            },
            {
              title: t('listAccordion.children5.children2.title2')
            },
            {
              title: t('listAccordion.children5.children2.title3'),
              bold: true
            },
            {
              title: t('listAccordion.children5.children2.title5')
            }
          ]
        }
      ]
    },
    {
      title: t('listAccordion.title6'),
      children: [
        {
          title: t('listAccordion.children6.title1'),
          children: [
            {
              title: t('listAccordion.children6.children1.title1')
            },
            {
              title: t('listAccordion.children6.children1.title2')
            },
            {
              title: t('listAccordion.children6.children1.title3')
            },
            {
              title: t('listAccordion.children6.children1.title4')
            }
          ]
        },
        {
          title: t('listAccordion.children6.title2'),
          children: [
            {
              title: t('listAccordion.children6.children2.title1')
            },
            {
              title: t('listAccordion.children6.children2.title2')
            },

            { title: t('listAccordion.children6.children2.title3') },
            {
              title: t('listAccordion.children6.children2.title4')
            }
          ]
        },
        {
          title: t('listAccordion.children6.title3'),
          children: [
            {
              title: t('listAccordion.children6.children3.title1')
            },
            {
              title: t('listAccordion.children6.children3.title2')
            },
            {
              title: t('listAccordion.children6.children3.title3')
            },
            {
              title: t('listAccordion.children6.children3.title4')
            }
          ]
        },
        {
          title: t('listAccordion.children6.title4'),
          children: [
            {
              title: t('listAccordion.children6.children4.title1')
            },

            {
              title: t('listAccordion.children6.children4.title2')
            },
            {
              title: t('listAccordion.children6.children4.title3')
            },
            {
              title: t('listAccordion.children6.children4.title4')
            }
          ]
        },
        {
          title: t('listAccordion.children6.title5'),
          children: [
            {
              title: t('listAccordion.children6.children5.title1')
            }
          ]
        }
      ]
    }
  ]

  const [contentActive, setContentActive] = useState(listAccordion.find((i: any) => i.title === activeSelect)?.children)

  const handleActiveSelect = useCallback((title: any) => {
    setActiveSelect(title)
    setContentActive(listAccordion.find((i: any) => i.title === title)?.children)
    setChildActive(['0'])
  }, [])

  const handleSelect = useCallback(() => {
    const activeButton = document.querySelector(`button.menuActive`) as HTMLElement
    const highlight = highlightRef.current

    if (activeButton && highlight) {
      const { offsetTop: top, offsetHeight: height } = activeButton
      ;(highlight as HTMLElement).style.transform = `translateY(${top}px)`
      ;(highlight as HTMLElement).style.height = `${height}px`
    }
  }, [])

  useEffect(() => {
    handleSelect()
  }, [activeSelect])

  useEffect(() => {
    const handleResize = () => {
      handleSelect()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [activeSelect])

  return (
    <>
      <div className='py-5 13inch:py-10 3xl:py-[80px]'>
        <div className='ct-container hidden gap-10 md:flex'>
          <div className='relative w-full max-w-[320px] 3xl:max-w-[400px]'>
            <div className='absolute w-full border-l-4 border-[#FCB713] bg-gradient-to-r from-[#FCB71333] to-[#FCB71300] transition ' ref={highlightRef} />
            <div className='flex flex-col gap-2'>
              {listAccordion.map((i: any) => (
                <button
                  onClick={() => handleActiveSelect(i.title)}
                  className={`flex w-full items-center justify-start border-l-1 border-transparent px-8 py-4 text-lg ${
                    activeSelect === i.title ? ' menuActive text-black' : 'hover:border-[#FCB713]/5 hover:bg-gradient-to-r hover:from-[#FCB71333]/5 hover:to-[#FCB71300]/5'
                  }`}
                  key={i.title}
                >
                  <span className='relative z-[1] text-left'>{i.title}</span>
                </button>
              ))}
            </div>
          </div>
          <div className='w-full'>
            <Accordion
              selectionMode='single'
              variant='splitted'
              selectedKeys={childActive}
              onSelectionChange={(item): any => setChildActive(new Set(Array.from(item)) as any)}
              className='gap-5'
              itemClasses={{
                base: 'group-[.is-splitted]:shadow-[0px_0px_12px_2px_rgba(0,0,0,0.20)]'
              }}
            >
              {contentActive?.map((i: any, index: any) => (
                <AccordionItem
                  key={index?.toString()}
                  aria-label={i.title}
                  title={i.title}
                  classNames={{
                    content: 'flex flex-col gap-2 pb-8',
                    title: 'text-lg font-bold data-[open=true]:text-[#0B27B6]',
                    indicator: 'text-lg',
                    trigger: 'data-[focus-visible=true]:!outline-none'
                  }}
                >
                  {i.children.map((ic: any) => (
                    <p key={ic.title} className={`text-lg text-[#555] ${ic?.bold ? 'font-bold' : ''}`}>
                      {ic.title}
                    </p>
                  ))}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <div className='ct-container block md:hidden'>
          <div className='w-full'>
            <Accordion
              selectionMode='single'
              className='gap-5'
              itemClasses={{
                base: 'group-[.is-splitted]:shadow-[0px_8px_32px_0px_#00000014]'
              }}
            >
              {listAccordion.map((item: any) => (
                <AccordionItem
                  key={item.title}
                  aria-label={item.title}
                  title={item.title}
                  onPress={() => {
                    setTimeout(() => {
                      window.scrollTo({ top: 0 })
                    }, 500)
                  }}
                  classNames={{
                    content: 'flex flex-col gap-2',
                    title: 'text-lg font-bold data-[open=true]:text-[#0B27B6]',
                    indicator: 'text-lg',
                    trigger: 'data-[focus-visible=true]:!outline-none'
                  }}
                >
                  {item?.children.map((ic: any, index: any) => (
                    <Accordion
                      selectionMode='single'
                      key={ic.title}
                      className='gap-5'
                      itemClasses={{
                        base: 'group-[.is-splitted]:shadow-[0px_0px_12px_2px_rgba(0,0,0,0.20)]'
                      }}
                    >
                      <AccordionItem
                        key={index}
                        aria-label={ic.title}
                        title={ic.title}
                        classNames={{
                          content: 'flex flex-col gap-2 pb-2',
                          title: 'text-lg font-bold data-[open=true]:text-[#0B27B6] pl-2',
                          indicator: 'text-lg',
                          trigger: 'data-[focus-visible=true]:!outline-none'
                        }}
                      >
                        {ic?.children.map((icc: any) => (
                          <p className='text-lg text-[#555]' key={icc.title}>
                            {icc.title}
                          </p>
                        ))}
                      </AccordionItem>
                    </Accordion>
                  ))}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(FaqSection)
