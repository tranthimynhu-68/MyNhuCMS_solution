import React, { useState, useEffect } from 'react';
import blogService from '../services/blogService';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await blogService.getAllPosts();
                console.log('📰 Dữ liệu bài viết:', data);
                setPosts(data);
            } catch (error) {
                console.error("❌ Lỗi khi tải danh sách bài viết:", error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Hàm định dạng ngày tháng
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
            <div className="text-center my-4">
                <div className="spinner-border text-info" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Đang tải tin tức thời trang...</p>
            </div>
        );
    }

    return (
        <>
            <style>
                {`
                    .blog-section {
                        margin-top: 50px;
                        padding-top: 30px;
                        border-top: 2px solid #f0f0f0;
                    }
                    .blog-section .section-title {
                        font-size: 1.5rem;
                        font-weight: 700;
                        text-transform: uppercase;
                        color: #2c3e50;
                        position: relative;
                        padding-bottom: 15px;
                        margin-bottom: 25px;
                    }
                    .blog-section .section-title::after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 60px;
                        height: 3px;
                        background: #e74c3c;
                    }
                    .blog-section .section-title i {
                        color: #e74c3c;
                        margin-right: 10px;
                    }
                    .post-card {
                        transition: all 0.3s ease;
                        border: none;
                        border-radius: 12px;
                        overflow: hidden;
                        background: #fff;
                        box-shadow: 0 2px 15px rgba(0,0,0,0.06);
                    }
                    .post-card:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 8px 30px rgba(0,0,0,0.12);
                    }
                    .post-card .post-title {
                        font-size: 1.1rem;
                        font-weight: 700;
                        color: #2c3e50;
                        text-decoration: none;
                        transition: color 0.3s;
                        display: block;
                        margin-bottom: 8px;
                    }
                    .post-card .post-title:hover {
                        color: #e74c3c;
                    }
                    .post-card .post-description {
                        color: #6c757d;
                        font-size: 0.95rem;
                        margin-bottom: 12px;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                    .post-card .post-meta {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 0.85rem;
                        color: #adb5bd;
                    }
                    .post-card .post-meta .post-date i {
                        margin-right: 5px;
                    }
                    .post-card .post-meta .post-category {
                        background: #f8f9fa;
                        padding: 3px 12px;
                        border-radius: 50px;
                        font-size: 0.75rem;
                        color: #6c757d;
                        font-weight: 600;
                    }
                    .post-card .post-meta .btn-read-more {
                        background: transparent;
                        border: none;
                        color: #e74c3c;
                        font-weight: 600;
                        font-size: 0.85rem;
                        transition: all 0.3s;
                        padding: 0;
                    }
                    .post-card .post-meta .btn-read-more:hover {
                        color: #c0392b;
                        transform: translateX(5px);
                    }
                    @media (max-width: 576px) {
                        .blog-section .section-title {
                            font-size: 1.2rem;
                        }
                        .post-card .post-title {
                            font-size: 0.95rem;
                        }
                        .post-card .post-description {
                            font-size: 0.85rem;
                        }
                    }
                `}
            </style>

            <div className="blog-section">
                <h4 className="section-title">
                    <i className="fa-solid fa-newspaper"></i> Tin tức & Xu hướng thời trang
                </h4>

                {posts.length === 0 ? (
                    <div className="text-center py-5">
                        <i className="fa-regular fa-newspaper fa-3x text-muted mb-3 d-block"></i>
                        <p className="text-muted">Chưa có bài viết tin tức nào.</p>
                    </div>
                ) : (
                        <div className="row">
                            {posts.map((post) => (
                                <div className="col-lg-6 col-md-12 mb-4" key={post.id}>
                                    <div className="card post-card">
                                        <div className="card-body p-4">
                                            <a href={`/blog/${post.id}`} className="post-title">
                                                {post.title}
                                            </a>
                                            <p className="post-description">
                                                {post.shortDescription || post.description || 'Đang cập nhật nội dung tóm tắt...'}
                                            </p>
                                            <div className="post-meta">
                                                <span className="post-date">
                                                    <i className="fa-regular fa-calendar"></i>
                                                    {formatDate(post.createdDate || post.createdAt)}
                                                </span>
                                                <div className="d-flex align-items-center gap-2">
                                                    {post.category && (
                                                        <span className="post-category">
                                                            {post.category.name || post.category}
                                                        </span>
                                                    )}
                                                    <a href={`/blog/${post.id}`} className="btn-read-more">
                                                        Xem thêm <i className="fa-solid fa-arrow-right ms-1"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                )}
            </div>
        </>
    );
};

export default PostList;