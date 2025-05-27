import Navbar from '~/components/layouts/navbar'
import { MetaFunction } from '@remix-run/node'
import { Button } from '~/components/ui/button'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import { listArticleState } from '~/states/article'
import { listCategoryState } from '~/states/category'
import useArticleStore from '~/stores/article-store'
import useCategoryStore from '~/stores/category-store'
import useCommentStore from '~/stores/comment-store'
import { ParamsGetArticle } from '~/interfaces/article'
import CardArticle from '~/components/pages/feed/card/card-article'
import CardArticleLoading from '~/components/pages/feed/card/card-article-loading'
import PaginationFeed from '~/components/pages/feed/ui/pagination'
import { Skeleton } from '~/components/ui/skeleton'
import { article, comment } from '~/schema/post.schema'
import DialogCreateEdit from '~/components/pages/feed/dialog-create-edit'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Label } from '~/components/ui/label'
import { ListCategory } from '~/interfaces/category'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { IconChevronDown } from '@tabler/icons-react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Feed' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  const [articleList] = useRecoilState(listArticleState)
  const [categoryList] = useRecoilState(listCategoryState)

  const [isReady, setIsReady] = useState(false)
  const [isDialog, setIsDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [editedDocumentId, setEditedDocumentId] = useState('')
  const [isEditedComment, setIsEditedComment] = useState(false)

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [cover, setCover] = useState('')
  const [categories, setCategories] = useState('')
  const [comments, setComments] = useState('')

  const initialArticleParams = {
    'pagination[page]': 1,
    'pagination[pageSize]': 10,
    populate: '',
    'populate[category]': '*',
    'populate[comments][populate][user]': '*',
    'populate[user]': '*',
  }

  const [articleParams, setArticleParams] =
    useState<ParamsGetArticle>(initialArticleParams)

  const {
    GetArticleList: {
      mutate: getArticleListMutate,
      isPending: isPendingGetArticleList,
    },
    GetDetailArticle: { mutate: getDetailArticleMutate },
    PostArticle: { mutate: postArticleMutate },
    DeleteArticle: { mutate: deleteArticleMutate },
    PutArticle: { mutate: putArticleMutate },
  } = useArticleStore()
  const {
    GetCategoryList: { mutate: getCategoryListMutate },
  } = useCategoryStore()
  const {
    GetDetailComment: { mutate: detailCommentMutate },
    PostComment: { mutate: postCommentMutate },
    DeleteComment: { mutate: deleteCommentMutate },
    PutComment: { mutate: putCommentMutate },
  } = useCommentStore()

  const submitSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setPage(1)
    if (search !== '') {
      setArticleParams({
        ...articleParams,
        'filters[title][$eqi]': search,
      })
    } else {
      setArticleParams(initialArticleParams)
    }
  }

  const submitDelete = (documentIdArticle: string) => {
    deleteArticleMutate(documentIdArticle, {
      onSuccess: () => {
        getArticleListMutate(articleParams)
      },
    })
  }

  const cancelEdit = () => {
    setEditDialog(false)
    setTitle('')
    setContent('')
    setCover('')
  }

  const triggerEdit = (documentId: string) => {
    getDetailArticleMutate(documentId, {
      onSuccess: async (res) => {
        setEditedDocumentId(documentId)
        setTitle(res.data.data.title)
        setContent(res.data.data.description)
        setCover(res.data.data.cover_image_url)
        setEditDialog(true)
      },
    })
  }

  const triggerEditComment = (documentId: string) => {
    detailCommentMutate(documentId, {
      onSuccess: async (res) => {
        setEditedDocumentId(documentId)
        setComments(res.data.data.content)
        setIsEditedComment(true)
      },
    })
  }

  const handleCreateEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = {
      data: {
        title: title,
        description: content,
        cover_image_url: cover,
      },
    }

    const result = article.safeParse(params.data)

    if (result.success) {
      putArticleMutate(
        { id: editedDocumentId, params: params },
        {
          onSuccess: () => {
            getArticleListMutate(articleParams)
            cancelEdit()
          },
        }
      )
    } else {
      result.error.issues.map((item) => {
        toast.error(item.message, { autoClose: 2500, theme: 'colored' })
      })
    }
  }

  const cancelPost = () => {
    setIsDialog(false)
    setTitle('')
    setContent('')
    setCover('')
    setCategories('')
  }

  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = {
      data: {
        title: title,
        description: content,
        cover_image_url: cover,
        category: Number(categories),
      },
    }

    const result = article.safeParse(params.data)

    if (result.success) {
      postArticleMutate(params, {
        onSuccess: () => {
          getArticleListMutate(articleParams)
          cancelPost()
        },
      })
    } else {
      result.error.issues.map((item) => {
        toast.error(item.message, { autoClose: 2500, theme: 'colored' })
      })
    }
  }

  const handleCreateComment = (
    e: React.FormEvent<HTMLFormElement>,
    idArticle: number
  ) => {
    e.preventDefault()

    const params = {
      data: {
        content: comments,
        article: idArticle,
      },
    }

    const result = comment.safeParse(params.data)

    if (result.success) {
      postCommentMutate(params, {
        onSuccess: () => {
          getArticleListMutate(articleParams)
          setComments('')
        },
      })
    } else {
      result.error.issues.map((item) => {
        toast.error(item.message, { autoClose: 2500, theme: 'colored' })
      })
    }
  }

  const handleEditComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = {
      data: {
        content: comments,
      },
    }

    const result = comment.safeParse(params.data)

    if (result.success) {
      putCommentMutate(
        { id: editedDocumentId, params: params },
        {
          onSuccess: () => {
            getArticleListMutate(articleParams)
            setComments('')
            setIsEditedComment(false)
          },
        }
      )
    } else {
      result.error.issues.map((item) => {
        toast.error(item.message, { autoClose: 2500, theme: 'colored' })
      })
    }
  }

  const handleDeleteComment = (documentId: string) => {
    deleteCommentMutate(documentId, {
      onSuccess: () => {
        getArticleListMutate(articleParams)
      },
    })
  }

  const handleFilteredCategory = () => {
    setPage(1)
    if (filterCategory !== '') {
      setArticleParams({
        ...articleParams,
        'filters[category][name][$eqi]': filterCategory,
      })
    } else {
      setArticleParams(initialArticleParams)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken') as string

    if (!token) {
      toast.error('You must signin!', {
        theme: 'colored',
        autoClose: 2000,
      })

      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    } else {
      getCategoryListMutate()
      getArticleListMutate(articleParams, {
        onSettled: () => {
          setIsReady(true)
        },
      })
    }
  }, [])

  useEffect(() => {
    if (isReady) {
      getArticleListMutate(articleParams)
    }
  }, [articleParams])

  useEffect(() => {
    setArticleParams({ ...articleParams, 'pagination[page]': page })
  }, [page])

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        submitSearch={submitSearch}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 py-20 gap-4 max-w-[1080px] px-2 mx-auto">
        <div className="col-span-1 md:relative">
          <div className="md:flex md:flex-col hidden md:visible w-full md:sticky left-0 top-20 z-[40] bg-[#F9FAFB] border-gray-300 md:bg-transparent md:border-none md:z-[50] gap-3 px-2">
            <Button onClick={() => setIsDialog(true)}>Create Article</Button>
            {isDialog && (
              <DialogCreateEdit
                headerTitle="Create Article"
                isDialog={isDialog}
                cancelPost={cancelPost}
                handleFunction={handleCreatePost}
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                cover={cover}
                setCover={setCover}
                categories={categories}
                setCategories={setCategories}
                categoryList={categoryList}
              />
            )}
            <FilterCategoryLayout
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              listCategory={categoryList}
              handleFilteredCategory={handleFilteredCategory}
              setArticleParams={setArticleParams}
              initialArticleParams={initialArticleParams}
            />
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center justify-end md:hidden gap-3 pb-3">
            <DropdownCategoryFilter
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              listCategory={categoryList}
              articleParams={articleParams}
              setArticleParams={setArticleParams}
              initialArticleParams={initialArticleParams}
              setPage={setPage}
            />
            <Button onClick={() => setIsDialog(true)}>Create Article</Button>
          </div>
          <div className="flex flex-col gap-3">
            {isPendingGetArticleList ? (
              <CardArticleLoading />
            ) : (
              articleList?.data?.length !== 0 &&
              articleList?.data?.map((item, index) => (
                <CardArticle
                  key={index}
                  documentIdArticle={item?.documentId}
                  idArticle={item?.id}
                  title={item?.title}
                  cover={item?.cover_image_url}
                  content={item?.description}
                  creator={item.user?.username}
                  numComment={item.comments?.length}
                  submitDelete={submitDelete}
                  editTrigger={triggerEdit}
                  listComment={item?.comments}
                  submitComment={handleCreateComment}
                  editCommentTrigger={triggerEditComment}
                  comment={comments}
                  setComment={setComments}
                  handleEdit={handleEditComment}
                  isEditComment={isEditedComment}
                  setIsEditComment={setIsEditedComment}
                  handleDeleteComment={handleDeleteComment}
                />
              ))
            )}
            {page === articleList?.meta?.pagination?.pageCount &&
              articleList?.data?.length !== 0 &&
              !isPendingGetArticleList && (
                <span className="text-sm text-gray-400 text-center">
                  End of content
                </span>
              )}
            {articleList?.data?.length === 0 && !isPendingGetArticleList && (
              <span className="text-sm text-gray-400 text-center">
                Content not found
              </span>
            )}
            {isPendingGetArticleList ? (
              <div className="flex items-center justify-end">
                <Skeleton className="h-5 w-[200px]" />
              </div>
            ) : articleList?.data?.length === 0 ? (
              <></>
            ) : (
              <PaginationFeed
                page={page}
                setPage={setPage}
                totalPages={articleList?.meta?.pagination?.pageCount}
              />
            )}
          </div>
        </div>
      </div>
      {editDialog && (
        <DialogCreateEdit
          headerTitle="Edit Article"
          isDialog={editDialog}
          cancelPost={cancelEdit}
          handleFunction={handleCreateEdit}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          cover={cover}
          setCover={setCover}
          categories={categories}
          setCategories={setCategories}
          categoryList={categoryList}
        />
      )}
    </>
  )
}

function FilterCategoryLayout({
  listCategory,
  filterCategory,
  setFilterCategory,
  setArticleParams,
  initialArticleParams,
  handleFilteredCategory,
}: {
  listCategory: ListCategory
  filterCategory: string
  setArticleParams: React.Dispatch<React.SetStateAction<ParamsGetArticle>>
  initialArticleParams: ParamsGetArticle
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>
  handleFilteredCategory: () => void
}) {
  return (
    <Accordion type="single" collapsible className="z-10">
      <AccordionItem value="category" className="border-none">
        <AccordionTrigger className="border border-gray-300 p-2 bg-[#F9FAFB] rounded-lg no-underline">
          Category
        </AccordionTrigger>
        <AccordionContent className="p-2 bg-gray-100 rounded-lg">
          <RadioGroup
            value={filterCategory}
            className="flex flex-col gap-2"
            onValueChange={(value) => setFilterCategory(value)}
          >
            {listCategory?.data?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={item.name} id={item.id.toString()} />
                <Label htmlFor={item.id.toString()}>{item.name}</Label>
              </div>
            ))}
            {filterCategory && (
              <div className="flex items-center justify-between gap-2">
                <Button
                  onClick={() => {
                    setFilterCategory('')
                    setArticleParams(initialArticleParams)
                  }}
                  className="bg-red-500 w-full"
                >
                  Reset
                </Button>
                <Button onClick={handleFilteredCategory} className="w-full">
                  Submit
                </Button>
              </div>
            )}
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function DropdownCategoryFilter({
  listCategory,
  filterCategory,
  setFilterCategory,
  setArticleParams,
  articleParams,
  setPage,
  initialArticleParams,
}: {
  listCategory: ListCategory
  filterCategory: string
  setArticleParams: React.Dispatch<React.SetStateAction<ParamsGetArticle>>
  initialArticleParams: ParamsGetArticle
  articleParams: ParamsGetArticle
  setPage: React.Dispatch<React.SetStateAction<number>>
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-2">
          <p>Category</p>
          <IconChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={filterCategory}
          onValueChange={(value) => {
            setPage(1)
            setFilterCategory(value)
            setArticleParams({
              ...articleParams,
              'pagination[page]': 1,
              'filters[category][name][$eqi]': value,
            })
          }}
        >
          {listCategory?.data?.map((item, index) => (
            <DropdownMenuRadioItem value={item.name} key={index}>
              {item.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        {filterCategory && (
          <Button
            onClick={() => {
              setFilterCategory('')
              setArticleParams(initialArticleParams)
            }}
            className="bg-red-500 w-full"
          >
            Reset
          </Button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
