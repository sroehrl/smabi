FROM php:8.0.8-apache
RUN buildDeps=" \
        wget \
        git \
        ssh \
        zip \
        libzip-dev \
        curl \
    "; \
    set -x \
    && apt-get update && apt-get install -y $buildDeps --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-install  mysqli && \
    docker-php-ext-install  zip
RUN a2enmod rewrite && \
    apache2ctl restart
RUN wget https://getcomposer.org/installer -O - -q | php -- --quiet && \
    mv composer.phar /usr/local/bin/composer && \
    chowm -R www-data:www-data /var/www/html/model
RUN composer global require neoan3/neoan3 --ignore-platform-reqs
ENV PATH /root/.composer/vendor/bin:$PATH