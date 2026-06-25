import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import blogService from '../../services/blogService';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await blogService.getPostById(Number(id));
                console.log('📰 Chi tiết bài viết:', data);
                setPost(data);

                // Lấy bài viết liên quan
                if (data.category) {
                    const categoryId = typeof data.category === 'object'
                        ? data.category.id
                        : data.category;
                    const related = await blogService.getPostsByCategory(categoryId);
                    const filtered = related.filter(p => p.id !== data.id);
                    setRelatedPosts(filtered.slice(0, 4));
                }
            } catch (error) {
                console.error("❌ Lỗi khi tải chi tiết bài viết:", error);
                setError('Không thể tải bài viết. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPostDetail();
        }
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Chưa có ngày';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="text-center">
                    <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Đang tải bài viết...</p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="container py-5">
                <div className="text-center py-5">
                    <i className="fa-regular fa-circle-xmark fa-4x text-danger mb-3 d-block"></i>
                    <h3 className="text-danger">{error || 'Không tìm thấy bài viết'}</h3>
                    <p className="text-muted">Bài viết bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
                    <Link to="/" className="btn btn-outline-danger mt-3">
                        <i className="fa-solid fa-arrow-left me-2"></i> Quay lại trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <style>
                {`
                    .blog-detail-wrapper {
                        background: #f8f9fa;
                        min-height: 100vh;
                        padding: 40px 0;
                    }
                    .blog-detail-card {
                        background: #fff;
                        border-radius: 16px;
                        box-shadow: 0 4px 30px rgba(0,0,0,0.08);
                        overflow: hidden;
                        padding: 40px;
                    }
                    .blog-detail-card .post-header {
                        margin-bottom: 30px;
                        border-bottom: 2px solid #f0f0f0;
                        padding-bottom: 20px;
                    }
                    .blog-detail-card .post-header .post-title {
                        font-size: 2.2rem;
                        font-weight: 800;
                        color: #2c3e50;
                        line-height: 1.3;
                        margin-bottom: 15px;
                    }
                    .blog-detail-card .post-header .post-meta {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 20px;
                        align-items: center;
                        color: #6c757d;
                        font-size: 0.95rem;
                    }
                    .blog-detail-card .post-header .post-meta i {
                        margin-right: 5px;
                    }
                    .blog-detail-card .post-header .post-category {
                        background: #e74c3c;
                        color: #fff;
                        padding: 4px 16px;
                        border-radius: 50px;
                        font-size: 0.85rem;
                        font-weight: 600;
                    }
                    .blog-detail-card .post-image {
                        width: 100%;
                        max-height: 500px;
                        object-fit: cover;
                        border-radius: 12px;
                        margin-bottom: 25px;
                    }
                    .blog-detail-card .post-content {
                        font-size: 1.05rem;
                        line-height: 1.8;
                        color: #34495e;
                    }
                    .blog-detail-card .post-content p {
                        margin-bottom: 20px;
                    }
                    .blog-detail-card .post-content img {
                        max-width: 100%;
                        height: auto;
                        border-radius: 8px;
                        margin: 20px 0;
                    }
                    .blog-detail-card .post-content h2, 
                    .blog-detail-card .post-content h3 {
                        color: #2c3e50;
                        margin-top: 30px;
                        margin-bottom: 15px;
                    }
                    .blog-detail-card .post-content ul, 
                    .blog-detail-card .post-content ol {
                        padding-left: 25px;
                        margin-bottom: 20px;
                    }
                    .blog-detail-card .post-footer {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 2px solid #f0f0f0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: wrap;
                    }
                    .blog-detail-card .post-footer .post-tags {
                        display: flex;
                        gap: 8px;
                        flex-wrap: wrap;
                    }
                    .blog-detail-card .post-footer .post-tags .tag {
                        background: #f0f0f0;
                        padding: 4px 14px;
                        border-radius: 50px;
                        font-size: 0.85rem;
                        color: #6c757d;
                    }
                    .blog-detail-card .post-footer .post-actions {
                        display: flex;
                        gap: 10px;
                    }
                    .blog-detail-card .post-footer .post-actions button {
                        background: none;
                        border: none;
                        color: #6c757d;
                        transition: color 0.3s;
                        padding: 8px 16px;
                        border-radius: 8px;
                        background: #f8f9fa;
                    }
                    .blog-detail-card .post-footer .post-actions button:hover {
                        color: #e74c3c;
                        background: #fde8e8;
                    }
                    .related-posts {
                        margin-top: 40px;
                    }
                    .related-posts .related-title {
                        font-size: 1.3rem;
                        font-weight: 700;
                        color: #2c3e50;
                        margin-bottom: 20px;
                        padding-bottom: 12px;
                        border-bottom: 2px solid #f0f0f0;
                    }
                    .related-posts .related-title i {
                        color: #e74c3c;
                        margin-right: 10px;
                    }
                    .related-posts .related-card {
                        background: #fff;
                        border-radius: 12px;
                        padding: 20px;
                        box-shadow: 0 2px 15px rgba(0,0,0,0.06);
                        transition: all 0.3s ease;
                        height: 100%;
                        cursor: pointer;
                    }
                    .related-posts .related-card:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 8px 30px rgba(0,0,0,0.12);
                    }
                    .related-posts .related-card .related-post-title {
                        font-size: 1rem;
                        font-weight: 600;
                        color: #2c3e50;
                        margin-bottom: 8px;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                    .related-posts .related-card .related-post-title:hover {
                        color: #e74c3c;
                    }
                    .related-posts .related-card .related-post-date {
                        font-size: 0.85rem;
                        color: #adb5bd;
                    }
                    @media (max-width: 768px) {
                        .blog-detail-card {
                            padding: 20px;
                        }
                        .blog-detail-card .post-header .post-title {
                            font-size: 1.6rem;
                        }
                        .blog-detail-card .post-content {
                            font-size: 0.95rem;
                        }
                    }
                `}
            </style>

            <div className="blog-detail-wrapper">
                <div className="container">
                    {/* Nút quay lại */}
                    <Link to="/" className="btn btn-outline-danger mb-4">
                        <i className="fa-solid fa-arrow-left me-2"></i> Quay lại
                    </Link>

                    <div className="blog-detail-card">
                        {/* Header */}
                        <div className="post-header">
                            <h1 className="post-title">{post.title}</h1>
                            <div className="post-meta">
                                <span>
                                    <i className="fa-regular fa-calendar"></i>
                                    {formatDate(post.createdDate || post.createdAt)}
                                </span>
                                {post.author && (
                                    <span>
                                        <i className="fa-regular fa-user"></i>
                                        {post.author}
                                    </span>
                                )}
                                {post.category && (
                                    <span className="post-category">
                                        {typeof post.category === 'object'
                                            ? post.category.name
                                            : post.category}
                                    </span>
                                )}
                                {post.viewCount !== undefined && (
                                    <span>
                                        <i className="fa-regular fa-eye"></i>
                                        {post.viewCount} lượt xem
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Ảnh đại diện */}
                        {post.imageUrl && (
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="post-image"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        )}

                        {/* Nội dung */}
                        <div className="post-content">
                            {post.content ? (
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            ) : (
                                <p>{post.description || 'Nội dung bài viết đang được cập nhật...'}</p>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="post-footer">
                            {post.tags && post.tags.length > 0 && (
                                <div className="post-tags">
                                    {post.tags.map((tag, index) => (
                                        <span key={index} className="tag">#{tag}</span>
                                    ))}
                                </div>
                            )}
                            <div className="post-actions">
                                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                    <i className="fa-solid fa-arrow-up me-1"></i> Lên đầu
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bài viết liên quan */}
                    {relatedPosts.length > 0 && (
                        <div className="related-posts">
                            <h4 className="related-title">
                                <i className="fa-regular fa-newspaper"></i> Bài viết liên quan
                            </h4>
                            <div className="row">
                                {relatedPosts.map((related) => (
                                    <div className="col-lg-3 col-md-6 mb-3" key={related.id}>
                                        <Link to={`/post/${related.id}`} style={{ textDecoration: 'none' }}>
                                            <div className="related-card">
                                                <h6 className="related-post-title">{related.title}</h6>
                                                <span className="related-post-date">
                                                    <i className="fa-regular fa-calendar me-1"></i>
                                                    {formatDate(related.createdDate || related.createdAt)}
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default BlogDetail;