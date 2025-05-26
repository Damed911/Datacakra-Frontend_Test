import Navbar from '~/components/layouts/navbar'
import { MetaFunction } from '@remix-run/node'
import { Button } from '~/components/ui/button'
import { useEffect, useState } from 'react'
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
import { article } from '~/schema/post.schema'
import DialogCreateEdit from '~/components/pages/feed/dialog-create-edit'

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

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [cover, setCover] = useState('')
  const [categories, setCategories] = useState('')

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
    GetDetailCategory,
    PostCategory,
    DeleteCategory,
    PutCategory,
  } = useCategoryStore()
  const { GetDetailComment, PostComment, DeleteComment, PutComment } =
    useCommentStore()

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
    }
  }, [])

  useEffect(() => {
    getCategoryListMutate()
    getArticleListMutate(articleParams, {
      onSettled: () => {
        setIsReady(true)
      },
    })
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
        <div className="col-span-1">
          <div className="flex flex-col fixed sticky top-14 md:top-20 z-[40] md:z-[50] gap-3">
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
            <div className="flex flex-col border border-gray-300 p-4 bg-gray-300/75 rounded-lg">
              <h1 className="font-semibold text-lg">Categories List</h1>
              {categoryList.data?.map((item, index) => (
                <li key={index}>
                  <p>{item.name}</p>
                </li>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col gap-3">
            {isPendingGetArticleList ? (
              <CardArticleLoading />
            ) : (
              articleList?.data?.length !== 0 &&
              articleList?.data?.map((item, index) => (
                <CardArticle
                  key={index}
                  idArticle={item?.documentId}
                  title={item?.title}
                  cover={item?.cover_image_url}
                  content={item?.description}
                  creator={item.user?.username}
                  numComment={item.comments?.length}
                  submitDelete={submitDelete}
                  editTrigger={triggerEdit}
                />
              ))
            )}
            {page === articleList?.meta?.pagination?.pageCount && (
              <span className="text-sm text-gray-400 text-center">
                End of content
              </span>
            )}
            {!isPendingGetArticleList ? (
              <PaginationFeed
                page={page}
                setPage={setPage}
                totalPages={articleList?.meta?.pagination?.pageCount}
              />
            ) : (
              <div className="flex items-center justify-end">
                <Skeleton className="h-5 w-[200px]" />
              </div>
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
